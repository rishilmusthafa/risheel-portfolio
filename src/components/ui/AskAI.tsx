"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, isToolUIPart, getToolName, type UIMessage } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useChatWidget } from "@/context/ChatWidgetContext";
import { usePortfolioActionBridge } from "@/context/PortfolioActionBridge";

type ScrollToSectionOutput = { applied: boolean; sectionId?: string };
type HighlightProjectOutput = { applied: boolean; reason?: string; projectId?: number; title?: string };

function textOf(message: UIMessage): string {
  return message.parts
    .filter((p) => p.type === "text")
    .map((p) => (p as { text: string }).text)
    .join("");
}

const STARTER_SUGGESTIONS = [
  "What AI projects has he built?",
  "Show me his banking projects",
  "How many years of experience does he have?",
];

// The route's system prompt (src/app/api/chat/route.ts) asks the model to
// end every answer with a "SUGGESTIONS: a|b|c" line — this pulls it out of
// the streamed text (so it's never rendered as prose, even mid-stream while
// the line is still arriving) and returns the two separately.
const SUGGESTIONS_MARKER_RE = /\n+SUGGESTIONS:\s*([\s\S]*)$/i;
function splitSuggestions(text: string): { body: string; suggestions: string[] } {
  const match = text.match(SUGGESTIONS_MARKER_RE);
  if (!match) return { body: text, suggestions: [] };
  const suggestions = match[1]
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3);
  return { body: text.slice(0, match.index).trimEnd(), suggestions };
}

// Matches src/components/layout/Navbar.tsx's navLinks wording, not the raw
// section ids, so a badge reads the same as the nav item a visitor would
// have clicked themselves.
const SECTION_LABELS: Record<string, string> = {
  home: "Home",
  about: "About",
  experience: "Work",
  skills: "Stack",
  projects: "Projects",
  contact: "Contact",
};

// Surfaces what the AI actually did, not just what it said — 2026 agentic-UX
// research is consistent that this kind of concrete action transparency is
// what earns trust in an agent, vs. a chat that only talks. Only built from
// tool calls that actually succeeded (`applied: true`): a badge for a
// failed/no-op action would misrepresent what happened, which is the
// opposite of the goal — the prose reply already explains failures per the
// system prompt's existing instruction.
function toolBadgesOf(message: UIMessage): { key: string; label: string }[] {
  const badges: { key: string; label: string }[] = [];
  for (const part of message.parts) {
    if (!isToolUIPart(part) || part.state !== "output-available") continue;
    const toolName = getToolName(part);
    if (toolName === "scrollToSection") {
      const out = part.output as ScrollToSectionOutput;
      if (out.applied && out.sectionId) {
        badges.push({ key: part.toolCallId, label: `Scrolled to ${SECTION_LABELS[out.sectionId] ?? out.sectionId}` });
      }
    } else if (toolName === "highlightProject") {
      const out = part.output as HighlightProjectOutput;
      if (out.applied && out.title) {
        badges.push({ key: part.toolCallId, label: `Highlighted "${out.title}"` });
      }
    }
  }
  return badges;
}

function ToolBadges({ items }: { items: { key: string; label: string }[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
      {items.map((b) => (
        <span
          key={b.key}
          style={{
            fontSize: 10,
            color: "var(--accent)",
            border: "1px solid rgba(232,255,71,0.3)",
            background: "rgba(232,255,71,0.06)",
            padding: "2px 8px",
            borderRadius: 999,
            letterSpacing: "0.04em",
            fontFamily: "var(--font-mono)",
          }}
        >
          {b.label}
        </span>
      ))}
    </div>
  );
}

function SuggestionChips({ items, onPick }: { items: string[]; onPick: (text: string) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {items.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onPick(s)}
          style={{
            textAlign: "left",
            background: "rgba(232,255,71,0.04)",
            border: "1px solid rgba(232,255,71,0.18)",
            color: "var(--text)",
            fontSize: 12,
            padding: "8px 10px",
            borderRadius: 8,
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
          }}
        >
          {s}
        </button>
      ))}
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */
export default function AskAI() {
  const { open, closeChat, toggleChat } = useChatWidget();
  const { dispatch } = usePortfolioActionBridge();
  const [footerVisible, setFooterVisible] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, setMessages, status, error, clearError } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // Watches for completed scrollToSection/highlightProject tool results and
  // acts on them — scrollToSection is a generic DOM operation handled
  // directly here; highlightProject needs Projects.tsx's own state/refs, so
  // it goes through PortfolioActionBridge. `message.parts` re-renders many
  // times while a message streams in; the toolCallId-keyed seen-set stops
  // the same action from being applied twice.
  const dispatchedRef = useRef<Set<string>>(new Set());
  useEffect(() => {
    for (const m of messages) {
      for (const part of m.parts) {
        if (!isToolUIPart(part) || part.state !== "output-available") continue;
        const toolName = getToolName(part);
        if (toolName !== "scrollToSection" && toolName !== "highlightProject") continue;
        if (dispatchedRef.current.has(part.toolCallId)) continue;
        dispatchedRef.current.add(part.toolCallId);

        if (toolName === "scrollToSection") {
          const out = part.output as ScrollToSectionOutput;
          if (out.applied && out.sectionId) {
            document.getElementById(out.sectionId)?.scrollIntoView({ behavior: "smooth" });
          }
          continue;
        }

        const out = part.output as HighlightProjectOutput;
        if (out.applied && typeof out.projectId === "number") {
          dispatch({ kind: "highlightProject", projectId: out.projectId });
        }
      }
    }
  }, [messages, dispatch]);

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function sendQuestion(text: string) {
    const trimmed = text.trim();
    if (!trimmed || status === "streaming" || status === "submitted") return;
    setInput("");
    if (error) clearError();
    sendMessage({ text: trimmed });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendQuestion(input);
  }

  function handleNewChat() {
    setMessages([]);
    setInput("");
    if (error) clearError();
  }

  const bottomOffset = footerVisible ? 104 : 28;
  const busy = status === "streaming" || status === "submitted";
  const canSuggest = status === "ready" && !error;
  // Only the latest assistant turn's own follow-ups are relevant.
  const lastAssistantMessage = [...messages].reverse().find((m) => m.role === "assistant");
  const followupSuggestions = lastAssistantMessage ? splitSuggestions(textOf(lastAssistantMessage)).suggestions : [];

  return (
    <div
      style={{
        position: "fixed",
        bottom: bottomOffset,
        left: "clamp(12px, 2vw, 28px)",
        transition: "bottom 0.3s ease",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 8,
        fontFamily: "var(--font-mono)",
      }}
    >
      {/* Expanded panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              background: "rgba(10,10,10,0.92)",
              border: "1px solid var(--border)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              borderRadius: 12,
              width: "min(360px, calc(100vw - 40px))",
              height: "min(480px, calc(100vh - 160px))",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 4px 32px rgba(0,0,0,0.5)",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 14px",
                borderBottom: "1px solid var(--border)",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 11, color: "var(--accent)", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>
                Ask AI about Risheel
              </span>
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  type="button"
                  onClick={handleNewChat}
                  disabled={messages.length === 0}
                  title="New chat"
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--muted)",
                    fontSize: 11,
                    cursor: messages.length === 0 ? "default" : "pointer",
                    opacity: messages.length === 0 ? 0.4 : 1,
                    padding: "2px 4px",
                  }}
                >
                  ↺
                </button>
                <button
                  type="button"
                  onClick={closeChat}
                  aria-label="Close chat"
                  style={{ background: "none", border: "none", color: "var(--muted)", fontSize: 16, cursor: "pointer", lineHeight: 1, padding: "0 2px" }}
                >
                  ×
                </button>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "14px", display: "flex", flexDirection: "column", gap: 14 }}>
              {messages.length === 0 && (
                <>
                  <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>
                    Ask about Risheel&apos;s background, skills, or projects — or ask to be shown something.
                  </p>
                  <SuggestionChips items={STARTER_SUGGESTIONS} onPick={sendQuestion} />
                </>
              )}

              {messages.map((m) => {
                const body = m.role === "assistant" ? splitSuggestions(textOf(m)).body : textOf(m);
                const badges = m.role === "assistant" ? toolBadgesOf(m) : [];
                return (
                  <div
                    key={m.id}
                    style={{
                      alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                      maxWidth: "88%",
                      background: m.role === "user" ? "rgba(232,255,71,0.08)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${m.role === "user" ? "rgba(232,255,71,0.2)" : "var(--border)"}`,
                      borderRadius: 10,
                      padding: "8px 12px",
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: "var(--text)",
                    }}
                  >
                    {m.role === "assistant" ? (
                      <>
                        {badges.length > 0 && <ToolBadges items={badges} />}
                        <div className="ai-chat-markdown">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
                        </div>
                      </>
                    ) : (
                      body
                    )}
                  </div>
                );
              })}

              {busy && (
                <div style={{ alignSelf: "flex-start", fontSize: 12, color: "var(--muted)" }}>Thinking…</div>
              )}

              {error && (
                <p style={{ alignSelf: "flex-start", fontSize: 12, color: "var(--accent2)", margin: 0 }}>
                  {error.message === "content-filter"
                    ? "That couldn't be processed — try rephrasing your question."
                    : "The assistant is unavailable right now — try again in a bit."}
                </p>
              )}

              {/* Follow-up suggestions — related to the latest answer, falling
                  back to the starter list if the model's SUGGESTIONS line
                  didn't parse (e.g. a very short or degraded answer). */}
              {messages.length > 0 && canSuggest && (
                <SuggestionChips items={followupSuggestions.length > 0 ? followupSuggestions : STARTER_SUGGESTIONS} onPick={sendQuestion} />
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, padding: "10px 12px", borderTop: "1px solid var(--border)", flexShrink: 0 }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                disabled={busy}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  padding: "8px 10px",
                  fontSize: 12,
                  color: "var(--text)",
                  fontFamily: "var(--font-mono)",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                disabled={!input.trim() || busy}
                style={{
                  background: "var(--accent)",
                  color: "#000",
                  border: "none",
                  borderRadius: 8,
                  padding: "0 14px",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: !input.trim() || busy ? "default" : "pointer",
                  opacity: !input.trim() || busy ? 0.5 : 1,
                }}
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={toggleChat}
        whileTap={{ scale: 0.92 }}
        aria-label="Toggle AI chat"
        aria-expanded={open}
        title={open ? "Close AI chat" : "Ask AI about Risheel"}
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          border: `1px solid ${open ? "rgba(232,255,71,0.4)" : "var(--border)"}`,
          background: open ? "rgba(232,255,71,0.08)" : "rgba(10,10,10,0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          color: open ? "var(--accent)" : "var(--muted)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s",
          boxShadow: open ? "0 0 16px rgba(232,255,71,0.15)" : "none",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </motion.button>
    </div>
  );
}
