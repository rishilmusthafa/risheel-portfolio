// Client-safe (no "server-only" guard) — controls whether the Ask AI widget
// renders at all, independent of whether Azure credentials are configured.
// Default enabled unless explicitly set to "false", so leaving the var
// unset preserves existing behavior.
export const AI_WIDGET_ENABLED = process.env.NEXT_PUBLIC_AI_ENABLED !== "false";
