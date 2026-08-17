import "server-only";
import { streamText, convertToModelMessages, isStepCount, APICallError, type UIMessage, type ToolSet } from "ai";
import { createAzure } from "@ai-sdk/azure";
import { AI_ENABLED, AZURE_CONFIG, CHAT_STEP_LIMIT, MAX_OUTPUT_TOKENS } from "./config";

/* The only file in this project that imports from "ai" / "@ai-sdk/azure" —
   if a future SDK major renames things again, this is the only file that
   needs to change. Ported from this project's sibling dashboard apps'
   lib/ai/client.ts (same Azure resource setup, verified working there). */
export class AiUnavailableError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "AiUnavailableError";
  }
}

// AZURE_OPENAI_RESOURCE_NAME is documented as a bare resource name (the
// subdomain in https://<name>.openai.azure.com), but this project's actual
// resource sits behind a corporate proxy/CASB whose hostname doesn't end in
// .openai.azure.com — @ai-sdk/azure's own Azure-vs-generic-gateway detection
// then falls back to a "generic OpenAI-compatible gateway" URL shape with no
// /openai prefix, no /v1, and no api-version, which 404s in practice. Detect
// a full URL and treat it as that case explicitly.
//
// useDeploymentBasedUrls + a dated apiVersion is used unconditionally
// (not only for the proxy case) because it's the traditional, most broadly
// Azure-compatible request shape — the SDK's newer unified /v1 endpoint
// (its default when no apiVersion/useDeploymentBasedUrls is given) requires
// Responses-API support not verified against this resource, so it's
// deliberately not used here.
const DEFAULT_API_VERSION = "2024-06-01";

function buildAzureOptions(config: NonNullable<typeof AZURE_CONFIG>) {
  const isUrl = /^https?:\/\//i.test(config.resourceName);
  const apiVersion = config.apiVersion ?? DEFAULT_API_VERSION;
  if (isUrl) {
    const trimmed = config.resourceName.replace(/\/+$/, "");
    const baseURL = trimmed.endsWith("/openai") ? trimmed : `${trimmed}/openai`;
    return { baseURL, apiKey: config.apiKey, apiVersion, useDeploymentBasedUrls: true as const };
  }
  return { resourceName: config.resourceName, apiKey: config.apiKey, apiVersion, useDeploymentBasedUrls: true as const };
}

const azureProvider = AZURE_CONFIG ? createAzure(buildAzureOptions(AZURE_CONFIG)) : null;

function deploymentModel() {
  if (!azureProvider || !AZURE_CONFIG) {
    throw new AiUnavailableError("Azure OpenAI is not configured.");
  }
  // .chat() (classic Chat Completions), not the default callable (Responses
  // API) — see the comment above buildAzureOptions.
  return azureProvider.chat(AZURE_CONFIG.deployment);
}

// The route handler returns the Response synchronously, before the actual
// upstream Azure call has even started — so a failure there (e.g. Azure's
// input-side content-filter rejecting the prompt) can only surface
// asynchronously, mid-stream, as an error part useChat() turns into its
// `error` state. toUIMessageStreamResponse()'s onError controls what string
// becomes that error's `.message` on the client; this classifies it into a
// short stable code (never raw provider error text) so a content-filter
// block gets an accurate message instead of misleading generic "try again"
// wording, which would be wrong for a non-transient rejection.
function classifyStreamError(error: unknown): string {
  if (APICallError.isInstance(error) && /content_filter|responsibleaipolicyviolation|jailbreak/i.test(error.responseBody ?? "")) {
    return "content-filter";
  }
  return "unavailable";
}

// Converts UI messages -> model messages, runs the tool-calling loop
// (capped by CHAT_STEP_LIMIT), and returns a streamed Response the route
// handler can return directly. Failures here happen before any bytes are
// sent, so the route can still return a normal JSON error response.
export async function streamChatResponse(opts: { instructions: string; uiMessages: UIMessage[]; tools: ToolSet }): Promise<Response> {
  if (!AI_ENABLED) throw new AiUnavailableError("AI chat is not configured.");
  const modelMessages = await convertToModelMessages(opts.uiMessages, { tools: opts.tools });
  const result = streamText({
    model: deploymentModel(),
    instructions: opts.instructions,
    messages: modelMessages,
    tools: opts.tools,
    stopWhen: isStepCount(CHAT_STEP_LIMIT),
    maxOutputTokens: MAX_OUTPUT_TOKENS,
  });
  return result.toUIMessageStreamResponse({ onError: classifyStreamError });
}
