"use client";

import { createContext, useCallback, useContext, useState } from "react";

interface ChatWidgetCtx {
  open: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
}

const Ctx = createContext<ChatWidgetCtx | null>(null);

export const useChatWidget = (): ChatWidgetCtx => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useChatWidget must be used within ChatWidgetProvider");
  return ctx;
};

export function ChatWidgetProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const openChat = useCallback(() => setOpen(true), []);
  const closeChat = useCallback(() => setOpen(false), []);
  const toggleChat = useCallback(() => setOpen((v) => !v), []);

  return <Ctx.Provider value={{ open, openChat, closeChat, toggleChat }}>{children}</Ctx.Provider>;
}
