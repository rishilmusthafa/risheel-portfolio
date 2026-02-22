import type { Job, Project, SkillCategory, SkillBar, Stat } from '@/types';

export const jobs: Job[] = [
    {
        id: 1,
        period: "2020 — Present",
        company: "e& enterprise",
        role: "Senior Software Engineer",
        description: "Building enterprise-grade software solutions for one of UAE's leading telecommunications groups. Driving technical decisions, architecting scalable systems, and collaborating across cross-functional product teams.",
        tags: ["Enterprise Apps", "Next.js", "TypeScript", "React"]
    },
    {
        id: 2,
        period: "2019 — 2020",
        company: "HyperMedia Dubai",
        role: "Full Stack Developer",
        description: "Developed full-stack web solutions for a digital agency serving clients across the UAE. Built responsive front-end interfaces and server-side systems from requirements through deployment.",
        tags: ["Full Stack", "PHP", "JavaScript", "React"]
    },
    {
        id: 3,
        period: "2018",
        company: "Rayaat",
        role: "Web Developer",
        description: "Designed and built client-facing web applications, managing the full development lifecycle from requirements gathering to delivery.",
        tags: ["PHP", "WordPress", "HTML/CSS"]
    },
    {
        id: 4,
        period: "2017",
        company: "Team Power International",
        role: "Lead Web Developer",
        description: "Led web development projects for a Dubai-based firm, guiding technical direction and coordinating with teams to deliver quality client solutions on schedule.",
        tags: ["PHP", "WordPress", "Team Lead", "JavaScript"]
    },
    {
        id: 5,
        period: "2015 — 2017",
        company: "Advanced Interactive Media Solutions (AIMS)",
        role: "Software Developer",
        description: "Developed web software at a media-city digital agency. Built custom web applications and contributed to client projects spanning corporate, media, and e-commerce sectors.",
        tags: ["PHP", "JavaScript", "WordPress", "MySQL"]
    },
    {
        id: 6,
        period: "2013 — 2015",
        company: "Krea8ve Minds",
        role: "Technical Lead",
        description: "Led development of WordPress themes, plugins, and custom PHP applications in MVC architecture. Managed LAMP server environments, elicited client requirements, delivered design mock-ups, and mentored team members.",
        tags: ["WordPress", "PHP", "MySQL", "MVC", "SVN"]
    },
    {
        id: 7,
        period: "2011 — 2013",
        company: "Adox Solutions",
        role: "PHP Developer",
        description: "Built WordPress sites with custom themes and plugins, and programmed PHP web applications including CMS, e-commerce, and PDF solutions. Worked with MySQL and SVN in a collaborative development environment.",
        tags: ["WordPress", "PHP", "MySQL", "MVC"]
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
        tags: ["Next.js 14+", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Framer Motion", "CSS Animations", "Zustand", "TanStack Query", "Zod", "GSAP", "Vite"]
    },
    {
        category: "AI & Automation",
        tags: ["Claude AI", "Claude Code", "Cursor IDE", "n8n", "MCP Integrations", "Prompt Engineering", "Multi-Agent Systems", "OpenAI API", "LangChain", "RAG Pipelines", "Ollama", "AI Agents", "Hugging Face", "OpenRouter", "Gemini API", "Make", "Tripo3D", "Meshy AI"]
    },
    {
        category: "Tools & Workflow",
        tags: ["Figma", "Git / GitHub", "REST APIs", "Node.js", "Playwright", "Vercel", "Context7 MCP", "Docker", "GitHub Actions", "Supabase", "Prisma ORM", "Postman"]
    },
    {
        category: "Backend & Database",
        tags: ["Supabase", "PostgreSQL", "Prisma ORM", "tRPC", "Node.js", "REST APIs", "Drizzle ORM"]
    },
    {
        category: "DevOps & Infra",
        tags: ["Docker", "GitHub Actions", "Vercel", "Cloudflare Workers", "AWS", "CI/CD"]
    },
    {
        category: "Testing & Quality",
        tags: ["Playwright", "Vitest", "Jest", "ESLint", "Prettier", "Storybook"]
    }
];

export const skillBars: SkillBar[] = [
    { label: "Next.js / React", value: 95 },
    { label: "TypeScript", value: 88 },
    { label: "AI Tooling", value: 92 },
    { label: "UI/UX Impl.", value: 90 },
    { label: "Prompt Engineering", value: 93 },
    { label: "Automation (n8n)", value: 88 },
    { label: "Full-Stack Dev", value: 91 },
    { label: "Node.js / Backend", value: 80 }
];

export const marqueeItems: string[] = [
    "Next.js", "React", "TypeScript", "Tailwind", "shadcn/ui",
    "Claude AI", "n8n", "Node.js", "Figma", "Playwright",
    "Claude Code", "MCP", "Cursor IDE", "Framer Motion", "Vercel"
];

export const stats: Stat[] = [
    { number: "12+", label: "Years of Experience" },
    { number: "50+", label: "Projects Shipped" },
    { number: "12+", label: "AI Tools Mastered" },
    { number: "∞", label: "Problems Solved" }
];
