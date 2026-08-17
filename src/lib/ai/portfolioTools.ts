import "server-only";
import { z } from "zod";
import { tool, type ToolSet } from "ai";
import { projects } from "@/lib/data";

const SECTION_IDS = ["home", "about", "experience", "skills", "projects", "contact"] as const;

// Two tools, both grounded/validated server-side, both returning
// { applied, ... } so the client (components/ui/AskAI.tsx) knows whether to
// actually act, and the model knows whether to actually claim it happened.
//
// scrollToSection's own validation is trivial (the enum already constrains
// it) but it still returns { applied: true, sectionId } for symmetry with
// highlightProject and so the model has a clear "this happened" signal to
// build its confirmation sentence around, same pattern the reference
// dashboard project uses for its own agentic tools.
export function createPortfolioTools(): ToolSet {
  return {
    scrollToSection: tool({
      description:
        "Scroll the visitor's browser to a section of the portfolio (About, Experience, Skills, Projects, or Contact) — use this when the user asks to see or be shown something, not just told about it in prose.",
      inputSchema: z.object({ sectionId: z.enum(SECTION_IDS) }),
      execute: async ({ sectionId }) => ({ applied: true, sectionId }),
    }),

    highlightProject: tool({
      description:
        "Scroll to and visually highlight a specific project card by its title (e.g. \"KnowBot AI\", \"ADNOC NOC Portal\") — use this when the user asks about or wants to see a specific project. Returns whether a matching project was found; check \"applied\" before confirming to the user.",
      inputSchema: z.object({ title: z.string() }),
      execute: async ({ title }) => {
        const needle = title.trim().toLowerCase();
        const match =
          projects.find((p) => p.title.toLowerCase() === needle) ??
          projects.find((p) => p.title.toLowerCase().includes(needle) || needle.includes(p.title.toLowerCase()));
        if (!match) return { applied: false, reason: `No project matching "${title}" was found.` };
        return { applied: true, projectId: match.id, title: match.title };
      },
    }),
  };
}
