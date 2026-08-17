import "server-only";
import { jobs, projects, skills, stats } from "@/lib/data";

// Serializes the site's single source of truth (src/lib/data.ts) into a
// compact text block for the chat system prompt. Built programmatically,
// not hand-copied, so it automatically reflects any future edit to
// jobs/projects/skills/stats with no separate content to keep in sync.
export function buildPortfolioContext(): string {
  const statsBlock = stats.map((s) => `${s.number} ${s.label}`).join(" · ");

  const jobsBlock = jobs
    .map((j) => `- ${j.period} — ${j.role} at ${j.company}. ${j.description} [${j.tags.join(", ")}]`)
    .join("\n");

  const projectsBlock = projects
    .map((p) => `- #${p.id} "${p.title}": ${p.description} [${p.tags.join(", ")}]`)
    .join("\n");

  const skillsBlock = skills.map((c) => `- ${c.category}: ${c.tags.join(", ")}`).join("\n");

  return `STATS: ${statsBlock}

EXPERIENCE:
${jobsBlock}

PROJECTS (use the #id when calling highlightProject):
${projectsBlock}

SKILLS:
${skillsBlock}`;
}
