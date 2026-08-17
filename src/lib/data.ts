import type { Job, Project, SkillCategory, SkillBar, Stat } from '@/types';

export const jobs: Job[] = [
    {
        id: 1,
        period: "2020 — Present",
        company: "e& enterprise",
        role: "Senior Software Engineer",
        description: "Building enterprise-grade software across UAE government, banking, and energy — clients include Dubai Police, ADNOC, ADCB, and AWQAF. Alongside client delivery, built multiple internal AI initiatives spanning RAG platforms, autonomous agents, and multi-agent systems, all powered by Azure OpenAI.",
        tags: ["Enterprise Apps", "Next.js", "TypeScript", "React", "Azure OpenAI"]
    },
    {
        id: 2,
        period: "2019 — 2020",
        company: "HyperMedia Dubai",
        role: "Full Stack Developer & Digital Signage",
        description: "Developed full-stack web solutions for a digital agency serving clients across the UAE. Built responsive front-end interfaces and server-side systems from requirements through deployment. Managed digital signage content across 30+ mall screens throughout the UAE using the Broadsign platform.",
        tags: ["Full Stack", "PHP", "JavaScript", "React", "Broadsign", "Digital Signage"]
    },
    {
        id: 3,
        period: "2018",
        company: "Rayaat",
        role: "Full Stack Developer",
        description: "Designed and built client-facing web applications, managing the full development lifecycle from requirements gathering to delivery.",
        tags: ["PHP", "WordPress", "HTML/CSS"]
    },
    {
        id: 4,
        period: "2017",
        company: "Team Power International",
        role: "Full Stack Developer",
        description: "Delivered full-stack web solutions for a Dubai-based firm — custom PHP backends, JavaScript frontends, and WordPress builds across client projects spanning corporate and e-commerce sectors.",
        tags: ["PHP", "JavaScript", "HTML/CSS"]
    },
    {
        id: 5,
        period: "2015 — 2017",
        company: "Advanced Interactive Media Solutions (AIMS)",
        role: "Software Developer",
        description: "Built custom web applications at a media-city digital agency, contributing to client projects spanning corporate, media, and e-commerce sectors.",
        tags: ["PHP", "JavaScript", "WordPress", "Scala"]
    },
    {
        id: 6,
        period: "2013 — 2015",
        company: "Krea8ve Minds",
        role: "Senior PHP Developer",
        description: "Led development of WordPress themes, plugins, and custom PHP applications in MVC architecture. Managed LAMP server environments, gathered client requirements, and mentored team members.",
        tags: ["WordPress", "PHP", "MySQL", "LAMP"]
    },
    {
        id: 7,
        period: "2011 — 2013",
        company: "Adox Solutions",
        role: "PHP Developer",
        description: "Built WordPress sites with custom themes and plugins, and developed PHP web applications including CMS, e-commerce, and PDF solutions. Worked with MySQL and SVN in a collaborative environment.",
        tags: ["PHP", "WordPress", "MySQL", "SVN"]
    }
];

export const projects: Project[] = [
    // ── Flagship set (featured: true) — drives the sticky-scroll ───────────
    {
        id: 1,
        number: "01",
        featured: true,
        title: "KnowBot AI",
        description: "Multi-tenant RAG SaaS that turns a company's own documents into a deployable AI assistant. Docling parses uploads, BAAI embeddings power hybrid pgvector + BM25 retrieval with RRF fusion, and Azure OpenAI generates cited answers. Embeds on any site with a single script tag across 5 isolated Docker microservices.",
        tags: ["Next.js", "FastAPI", "LlamaIndex", "pgvector", "Azure OpenAI"],
        gradient: "linear-gradient(135deg, #05201c 0%, #0a3d34 50%, #041512 100%)",
        href: "#",
        image: "/projects/knowbotai.png"
    },
    {
        id: 2,
        number: "02",
        featured: true,
        title: "DevOps AI",
        description: "An 8-module internal operations platform consolidating scattered DevOps data: VM inventory with server detail pages, an SSL certificate tracker that forecasts expiry, a SPOC directory, an automated system health dashboard, an AI chat interface answering operational questions in plain English, plus metrics and feedback tracking. Deployed to Docker in production.",
        tags: ["Next.js 15", "Azure OpenAI", "pgvector RAG", "Docker"],
        gradient: "linear-gradient(135deg, #0a1a20 0%, #0d3045 50%, #050f18 100%)",
        href: "#",
        image: "/projects/devopsai.png"
    },
    {
        id: 3,
        number: "03",
        featured: true,
        title: "Compliance Agent",
        description: "An autonomous AI agent that audits physical site displays and device walls for compliance from camera photos across e& UAE locations. Compares live photos against reference images, scores compliance, and decides what happens next — notify staff, escalate, or schedule a recheck — weighing each decision against similar past audits.",
        tags: ["FastAPI", "Azure OpenAI Vision", "pgvector", "Celery", "Redis"],
        gradient: "linear-gradient(135deg, #1f1505 0%, #402b08 50%, #140d03 100%)",
        href: "#",
        image: "/projects/complianceagent.png"
    },
    {
        id: 4,
        number: "04",
        featured: true,
        title: "Research Agent",
        description: "An autonomous research platform that continuously monitors industry trends, competitors, and news on user-defined topics. A scheduled agentic pipeline — query planning, web research, market-data enrichment, LLM analysis, and report generation — compares each run against long-term vector memory and delivers executive summaries by email, with one-click export to PDF, Word, or PowerPoint.",
        tags: ["Next.js", "LangChain", "Azure OpenAI", "Celery", "Redis"],
        gradient: "linear-gradient(135deg, #120a1f 0%, #241145 50%, #0a0518 100%)",
        href: "#",
        image: "/projects/researchagent.png"
    },
    {
        id: 5,
        number: "05",
        featured: true,
        title: "Dubai Police Dashboard",
        description: "An AI layer built into an operational analytics dashboard, combining several purpose-built agents rather than one generic chatbot — narrative summaries of backlog trends, a multi-agent insight generator, and a bilingual (Arabic/English) conversational assistant that can act on the dashboard directly. A dedicated data-access layer strips personal information before anything reaches the AI.",
        tags: ["Next.js", "Azure OpenAI", "Vercel AI SDK", "Streaming Chat"],
        gradient: "linear-gradient(135deg, #050e1f 0%, #0a1f45 50%, #030814 100%)",
        href: "#"
    },
    {
        id: 6,
        number: "06",
        featured: true,
        title: "Oyoon — Dubai Police",
        description: "Built the admin panel for Dubai Police's national camera monitoring system — controlling which officers access which camera feeds and locations. User and group management, role-based permissions, Active Directory SSO, SMS notifications via ESB, and a full audit log.",
        tags: ["Next.js", "Tailwind CSS", "TypeScript"],
        gradient: "linear-gradient(135deg, #0a1218 0%, #16303f 50%, #050a0d 100%)",
        href: "#"
    },
    {
        id: 7,
        number: "07",
        featured: true,
        title: "ADNOC NOC Portal",
        description: "Shipped the permitting portal for smart infrastructure installation across 72 ADNOC sites in all 7 UAE Emirates — a 5-stage government approval chain, live equipment inventory per site, and a UAE-wide Mapbox installations map.",
        tags: ["Next.js", "MUI", "Mapbox", "RTL/i18n"],
        gradient: "linear-gradient(135deg, #1f1005 0%, #402008 50%, #140a03 100%)",
        href: "#"
    },

    // ── Grid set (featured: false) ──────────────────────────────────────────
    {
        id: 8,
        number: "08",
        featured: false,
        title: "MPOS — ADCB",
        description: "Built a dual-portal POS operations platform for Abu Dhabi Commercial Bank — real-time SLA dashboards, terminal & accessory inventory, merchant management, request tracking with timelines, and field team assignments.",
        tags: ["Next.js 14", "MUI", "Redux", "Framer Motion"],
        gradient: "linear-gradient(135deg, #051f16 0%, #0b3d28 50%, #04140d 100%)",
        href: "#"
    },
    {
        id: 9,
        number: "09",
        featured: false,
        title: "SmartKhateeb",
        description: "Built the operations portal for AWQAF Ministry of Islamic Affairs managing 1,000+ mosque khateebs across all UAE Emirates — trilingual (AR/EN/Urdu) sermon scheduling, evaluations, recordings, and reports, with Active Directory SSO and full RBAC.",
        tags: ["Next.js 15", "shadcn/ui", "TanStack Table"],
        gradient: "radial-gradient(ellipse at 30% 50%, #1a1200 0%, #050a04 60%)",
        href: "#"
    },
    {
        id: 10,
        number: "10",
        featured: false,
        title: "GCGRA Self-Exclusion",
        description: "Built the UAE's national gaming self-exclusion platform for the Gaming Regulatory Authority — UAE Pass national ID auth, 5 gaming categories, exclusion periods from 6 months to 5 years, bilingual AR RTL/EN, and WCAG 2.1 AA compliance.",
        tags: ["Next.js 15", "Tailwind CSS", "UAE Pass"],
        gradient: "linear-gradient(135deg, #1f0a0a 0%, #401515 50%, #140505 100%)",
        href: "#"
    },
    {
        id: 11,
        number: "11",
        featured: false,
        title: "NHRI UAE",
        description: "Official website for the UAE's National Human Rights Institution, with a multilingual complaint submission portal, media center, and public awareness resources.",
        tags: ["Laravel", "PHP", "MySQL", "RTL/i18n"],
        gradient: "linear-gradient(135deg, #0a1020 0%, #0d2045 50%, #060c1a 100%)",
        href: "https://nhriuae.com/en",
        image: "/projects/nhriuae.png"
    },
    {
        id: 12,
        number: "12",
        featured: false,
        title: "Sharjah Safari",
        description: "Website for the UAE's largest wildlife reserve, featuring online ticket booking, live animal cams, interactive safari maps, and conservation program showcases.",
        tags: ["WordPress", "PHP", "ACF Pro", "WPML"],
        gradient: "linear-gradient(135deg, #0f1f0a 0%, #1a3311 50%, #0a1a08 100%)",
        href: "https://sharjahsafari.ae/en/",
        image: "/projects/sharjahsafari.png"
    },
    {
        id: 13,
        number: "13",
        featured: false,
        title: "Oyoon SIM & Router",
        description: "Shipped a complete hardware logistics platform for the internal e& enterprise team — 4 roles, a 2-stage approval chain, real-time hardware availability dashboard, overdue alerts, and issuance/return tracking with CSV export.",
        tags: ["Next.js 15", "Prisma ORM", "PostgreSQL"],
        gradient: "linear-gradient(135deg, #0a1420 0%, #16283f 50%, #060c14 100%)",
        href: "#"
    },
    {
        id: 14,
        number: "14",
        featured: false,
        title: "Digital Signage — Patchi & Sharjah Customs",
        description: "Managed digital signage content and screen networks for Patchi retail locations and Sharjah Customs — content scheduling, playlist management, and screen zone configuration, including a platform migration from AppSpace to Navori.",
        tags: ["AppSpace", "Navori"],
        gradient: "linear-gradient(135deg, #1a0a17 0%, #33112c 50%, #0f0510 100%)",
        href: "#"
    },
    {
        id: 15,
        number: "15",
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
        tags: ["Next.js 15", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "MUI", "Framer Motion", "CSS Animations", "Zustand", "TanStack Query", "Zod", "GSAP", "Vite", "RTL / Arabic", "WCAG 2.1 AA", "i18n / Localization"]
    },
    {
        category: "AI & Automation",
        tags: ["Claude AI", "Claude Code", "Cursor IDE", "GitHub Copilot", "Gemini CLI", "n8n", "MCP Integrations", "Prompt Engineering", "Multi-Agent Systems", "Azure OpenAI", "OpenAI API", "LangChain", "RAG Pipelines", "Hybrid Retrieval", "pgvector", "LlamaIndex", "Tool Calling", "Vercel AI SDK", "Vision LLMs / Multimodal AI", "Ollama", "AI Agents", "Hugging Face", "OpenRouter", "Gemini API", "Make", "Tripo3D", "Meshy AI"]
    },
    {
        category: "Tools & Workflow",
        tags: ["Figma", "Git / GitHub", "REST APIs", "Node.js", "Playwright", "Vercel", "Context7 MCP", "Docker", "GitHub Actions", "Supabase", "Prisma ORM", "Postman"]
    },
    {
        category: "Backend & Database",
        tags: ["Supabase", "PostgreSQL", "Prisma ORM", "tRPC", "Node.js", "FastAPI", "Python", "PHP / Laravel", "WordPress", "REST APIs", "Drizzle ORM", "Celery", "Redis", "Microservices"]
    },
    {
        category: "DevOps & Infra",
        tags: ["Docker", "GitHub Actions", "Vercel", "Cloudflare Workers", "AWS", "CI/CD"]
    },
    {
        category: "Testing & Quality",
        tags: ["Playwright", "Vitest", "Jest", "ESLint", "Prettier", "Storybook"]
    },
    {
        category: "IoT & Digital Signage",
        tags: ["ThingWorx", "PTC Composer", "Scala", "BroadSign", "AppSpace", "Navori"]
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
    "Claude Code", "MCP", "Cursor IDE", "Framer Motion", "Vercel",
    "Azure OpenAI", "FastAPI", "pgvector"
];

export const stats: Stat[] = [
    { number: "14+", label: "Years of Experience" },
    { number: "50+", label: "Projects Shipped" },
    { number: "5", label: "AI Initiatives Built" },
    { number: "∞", label: "Problems Solved" }
];
