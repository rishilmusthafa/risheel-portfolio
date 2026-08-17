import "server-only";
import { NextRequest, NextResponse } from "next/server";
import type { UIMessage } from "ai";
import { streamChatResponse, AiUnavailableError } from "@/lib/ai/client";
import { AI_ENABLED } from "@/lib/ai/config";
import { createPortfolioTools } from "@/lib/ai/portfolioTools";
import { buildPortfolioContext } from "@/lib/ai/portfolioContext";

const MAX_MESSAGES = 30;
const MAX_MESSAGE_CHARS = 2000;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 20; // messages per IP per window

// Per-instance, in-memory — resets on cold start/redeploy and isn't shared
// across parallel serverless instances, so it's a soft control, not a hard
// guarantee. Paired with MAX_OUTPUT_TOKENS (src/lib/ai/config.ts) and
// CHAT_STEP_LIMIT, which hold regardless of instance count and bound the
// worst case per request even if this counter is bypassed.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count += 1;
  return true;
}

function messageTextLength(message: UIMessage): number {
  return message.parts.filter((p) => p.type === "text").reduce((sum, p) => sum + (p as { text: string }).text.length, 0);
}

// Built once at module load, not per-request — src/lib/data.ts is static
// import-time data, so the serialized context never changes at runtime.
const CHAT_INSTRUCTIONS = `You are an AI assistant embedded in Risheel Musthafa's portfolio site, answering visitor questions about his background, skills, and experience.

Ground every answer only in the information below — never invent facts, projects, employers, or skills that aren't listed. If asked something the data doesn't cover, say so plainly rather than guessing.

When the user asks to see, be shown, or go to a section of the site (e.g. "show me his experience", "take me to contact"), use scrollToSection rather than only describing it in prose. When the user asks about or wants to see a specific project, use highlightProject. Check "applied" in the tool's result before confirming to the user — if false, say why instead of claiming it happened.

Keep answers concise (a few sentences). If the user asks something unrelated to Risheel's background or work (general knowledge, unrelated topics, casual chit-chat), politely decline in one short sentence and redirect them to what you can help with instead.

If the user wants to actually get in touch with Risheel, point them to the Contact section, his email, or WhatsApp rather than trying to handle the request yourself.

After your answer, on its own final line with nothing before or after it, write exactly "SUGGESTIONS: " followed by 2 or 3 short natural follow-up questions a visitor might realistically ask next given what you just answered, each under 10 words, separated by "|". This line is parsed by the UI and never shown to the user as-is, so always include it, even for short answers or declines.

${buildPortfolioContext()}`;

// POST, streaming, Node runtime (default — no `export const runtime`).
// Public, unauthenticated — anyone can chat, unlike the session-gated
// dashboard this pattern was ported from.
export async function POST(req: NextRequest) {
  if (!AI_ENABLED) {
    return NextResponse.json({ error: "AI chat is not configured." }, { status: 503 });
  }

  if (!checkRateLimit(getClientIp(req))) {
    return NextResponse.json({ error: "Too many messages — please try again in a bit." }, { status: 429 });
  }

  try {
    const body = (await req.json()) as { messages?: UIMessage[] };
    const uiMessages = body.messages ?? [];

    if (uiMessages.length > MAX_MESSAGES) {
      return NextResponse.json({ error: "This conversation has gotten long — please start a new chat." }, { status: 400 });
    }
    if (uiMessages.some((m) => messageTextLength(m) > MAX_MESSAGE_CHARS)) {
      return NextResponse.json({ error: "That message is too long." }, { status: 400 });
    }

    const tools = createPortfolioTools();
    return await streamChatResponse({ instructions: CHAT_INSTRUCTIONS, uiMessages, tools });
  } catch (e) {
    if (e instanceof AiUnavailableError) {
      return NextResponse.json({ error: "AI chat is temporarily unavailable." }, { status: 503 });
    }
    return NextResponse.json({ error: "AI chat is temporarily unavailable." }, { status: 503 });
  }
}
