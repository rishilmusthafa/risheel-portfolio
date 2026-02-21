import type { Job, Project, SkillCategory, SkillBar, Stat } from '@/types';

export const jobs: Job[] = [
    {
        id: 1,
        period: "2022 — Present",
        company: "Enterprise App Dev Co.",
        role: "Frontend Engineer",
        description: "Building enterprise-grade web applications in Next.js. Led the initiative for a component library system to streamline design-to-code workflows. Integrated AI-powered tools into the development pipeline.",
        tags: ["Next.js", "TypeScript", "shadcn/ui", "Figma"]
    },
    {
        id: 2,
        period: "2021 — 2022",
        company: "Previous Role",
        role: "Junior Frontend Developer",
        description: "Developed responsive interfaces, worked closely with design teams to translate Figma mockups into pixel-perfect implementations. API integration work.",
        tags: ["React", "CSS", "REST API"]
    },
    {
        id: 3,
        period: "2020 — 2021",
        company: "Freelance & Projects",
        role: "Web Developer",
        description: "Delivered custom web solutions including a Quran application and automation workflows. Began exploring AI tools and workflow automation systems.",
        tags: ["React Native", "Node.js", "Automation"]
    }
];

export const projects: Project[] = [
    {
        id: 1,
        number: "01",
        featured: true,
        title: "Instruction Stability Engine",
        description: "Converts vague AI prompts into structured instructions and measures output consistency across multiple LLM runs.",
        tags: ["Claude AI", "LLM", "TypeScript"],
        gradient: "radial-gradient(ellipse at 30% 50%, #0f1f0a 0%, #050a04 60%)",
        href: "#"
    },
    {
        id: 2,
        number: "02",
        featured: false,
        title: "Enterprise Component Library",
        description: "Design-to-code workflow system enabling faster UI delivery from Figma.",
        tags: ["Next.js", "shadcn/ui"],
        gradient: "linear-gradient(135deg, #0f1f0a 0%, #1a3311 50%, #0a1a08 100%)",
        href: "#"
    },
    {
        id: 3,
        number: "03",
        featured: false,
        title: "AI Code Review System",
        description: "Multi-agent pipeline with subagents for static analysis and test generation.",
        tags: ["Claude Code", "Playwright", "MCP"],
        gradient: "linear-gradient(135deg, #1a0a1f 0%, #2d1145 50%, #110820 100%)",
        href: "#"
    },
    {
        id: 4,
        number: "04",
        featured: false,
        title: "WhatsApp Automation Platform",
        description: "Enterprise-grade WhatsApp automation and customer service workflows.",
        tags: ["n8n", "WhatsApp API"],
        gradient: "linear-gradient(135deg, #1f1a0a 0%, #3d2d10 50%, #1a1208 100%)",
        href: "#"
    },
    {
        id: 5,
        number: "05",
        featured: false,
        title: "Quran Application",
        description: "Mobile-first Quran reading experience with clean typography.",
        tags: ["React Native", "Audio"],
        gradient: "linear-gradient(135deg, #0f0f1f 0%, #1a1a3f 50%, #0a0a1a 100%)",
        href: "#"
    }
];

export const skills: SkillCategory[] = [
    {
        category: "Frontend Core",
        tags: ["Next.js 14+", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Framer Motion", "CSS Animations"]
    },
    {
        category: "AI & Automation",
        tags: ["Claude AI", "Claude Code", "Cursor IDE", "n8n", "MCP Integrations", "Prompt Engineering", "Multi-Agent Systems"]
    },
    {
        category: "Tools & Workflow",
        tags: ["Figma", "Git / GitHub", "REST APIs", "Node.js", "Playwright", "Vercel", "Context7 MCP"]
    }
];

export const skillBars: SkillBar[] = [
    { label: "Next.js / React", value: 95 },
    { label: "TypeScript", value: 88 },
    { label: "AI Tooling", value: 92 },
    { label: "UI/UX Impl.", value: 90 }
];

export const marqueeItems: string[] = [
    "Next.js", "React", "TypeScript", "Tailwind", "shadcn/ui",
    "Claude AI", "n8n", "Node.js", "Figma", "Playwright",
    "Claude Code", "MCP", "Cursor IDE", "Framer Motion", "Vercel"
];

export const stats: Stat[] = [
    { number: "4+", label: "Years of Experience" },
    { number: "50+", label: "Projects Shipped" },
    { number: "12+", label: "AI Tools Mastered" },
    { number: "∞", label: "Problems Solved" }
];
