"use client";

import { createContext, useCallback, useContext, useMemo, useRef } from "react";

// Lets the Ask AI widget actually act on the page (scroll to and highlight a
// specific project card) instead of only describing it in prose — the
// "chat acts on the app" pattern this project already ships in the Dubai
// Police Dashboard's AI Insights & Chat Agent feature, adapted here.
//
// Simplified from that project's filterActionBridge.tsx: that bridge keys
// its registry by screenId because it has multiple screens/mounted views.
// This portfolio has exactly one Projects section always mounted, so a
// single registered handler is enough — no per-screen Map needed.
export type PortfolioAction = { kind: "highlightProject"; projectId: number };

export type PortfolioActionContextValue = {
  /** Called by Projects.tsx on mount; returns an unregister function. */
  register: (apply: (action: PortfolioAction) => void) => () => void;
  /** Called by AskAI.tsx to act on the page. */
  dispatch: (action: PortfolioAction) => void;
};

const PortfolioActionContext = createContext<PortfolioActionContextValue | null>(null);

export function usePortfolioActionBridge(): PortfolioActionContextValue {
  const ctx = useContext(PortfolioActionContext);
  if (!ctx) throw new Error("usePortfolioActionBridge must be used within a PortfolioActionProvider.");
  return ctx;
}

export function PortfolioActionProvider({ children }: { children: React.ReactNode }) {
  const handlerRef = useRef<((action: PortfolioAction) => void) | null>(null);

  const register = useCallback((apply: (action: PortfolioAction) => void) => {
    handlerRef.current = apply;
    return () => {
      if (handlerRef.current === apply) handlerRef.current = null;
    };
  }, []);

  const dispatch = useCallback((action: PortfolioAction) => {
    handlerRef.current?.(action);
  }, []);

  const value = useMemo<PortfolioActionContextValue>(() => ({ register, dispatch }), [register, dispatch]);

  return <PortfolioActionContext.Provider value={value}>{children}</PortfolioActionContext.Provider>;
}
