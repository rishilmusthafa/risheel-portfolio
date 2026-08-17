import "server-only";

// Central switch the chat route checks before doing anything — if any var
// is missing, AI_ENABLED is false and the widget shows "unavailable" rather
// than the site crashing. Ported from the same pattern used in this
// project's sibling dashboards (same Azure resource, same env var names).
// An unset var and an empty-but-present one (AZURE_OPENAI_API_VERSION=)
// both read as "" from process.env, not undefined — normalize both to
// undefined so downstream `?? DEFAULT_API_VERSION` fallbacks actually apply.
const orUndefined = (v: string | undefined) => (v ? v : undefined);

const RESOURCE_NAME = orUndefined(process.env.AZURE_OPENAI_RESOURCE_NAME);
const API_KEY = orUndefined(process.env.AZURE_OPENAI_API_KEY);
const DEPLOYMENT = orUndefined(process.env.AZURE_OPENAI_DEPLOYMENT);
const API_VERSION = orUndefined(process.env.AZURE_OPENAI_API_VERSION);

export const AI_ENABLED = Boolean(RESOURCE_NAME && API_KEY && DEPLOYMENT);

export const AZURE_CONFIG = AI_ENABLED
  ? {
      resourceName: RESOURCE_NAME as string,
      apiKey: API_KEY as string,
      deployment: DEPLOYMENT as string,
      apiVersion: API_VERSION, // undefined -> lib/ai/client.ts's DEFAULT_API_VERSION
    }
  : null;

// Caps the chat tool-calling loop (streamText's stopWhen). Kept low (2-3,
// not the 6+ a multi-tool dashboard assistant might need): this widget only
// has two trivial navigation tools, and every step re-sends the full system
// prompt (which carries the entire serialized portfolio context) — a higher
// limit directly multiplies input-token cost per visitor message on a
// public, unauthenticated endpoint.
export const CHAT_STEP_LIMIT = 3;

// Hard ceiling on a single response's output tokens — the one abuse control
// that holds regardless of how many serverless instances are running (an
// in-memory per-IP counter is only ever per-instance).
export const MAX_OUTPUT_TOKENS = 600;
