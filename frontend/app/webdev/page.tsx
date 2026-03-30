"use client";

import { useRef } from "react";
import {
  Globe, ArrowLeft, Server, Database, Layers, Box,
  CheckCircle2, Sparkles, Code2, Cpu,
} from "lucide-react";
import Link from "next/link";
import { motion, useInView, Variants } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import SkillBadge from "@/components/SkillBadge";
import GridBackground from "@/components/GridBackground";

/* ── Variants ─────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const fadeLeft = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const fadeRight = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = (s = 0.1, d = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: s, delayChildren: d } },
});

/* ── useInView wrapper ─────────────────────────────────────── */
function FadeSection({ children, className = "", variants = stagger() }: {
  children: React.ReactNode; className?: string;
  variants?: Variants;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ── Data ──────────────────────────────────────────────────── */
const skills = [
  { category: "Frontend", color: "cyan" as const, icon: Layers,   items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux", "Zustand", "HTML5 / CSS3"] },
  { category: "Backend",  color: "green" as const, icon: Server,  items: ["Node.js", "Express.js", "FastAPI", "Python", "REST APIs", "GraphQL", "WebSockets", "Middleware"] },
  { category: "Database", color: "purple" as const, icon: Database, items: ["PostgreSQL", "MongoDB", "Redis", "Prisma ORM", "Supabase", "Firebase", "SQL", "NoSQL"] },
  { category: "DevOps & Tools", color: "orange" as const, icon: Box, items: ["Docker", "Git & GitHub", "Vercel", "CI/CD", "Nginx", "Linux", "Jest", "Vitest"] },
];

const projects = [
  { title: "FullStack Task Manager", description: "A real-time collaborative task management app with drag-and-drop boards, team workspaces, and role-based access control. Built with Next.js App Router and Postgres.", tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "WebSockets", "Tailwind"], accent: "cyan" as const, github: "/", featured: true },
  { title: "Developer Portfolio CMS", description: "A headless CMS-powered portfolio system with markdown support, project management, and analytics dashboard. Supports dark/light theming.", tags: ["Next.js", "MDX", "Tailwind", "Supabase", "Vercel"], accent: "green" as const, github: "/" },
  { title: "REST API Boilerplate", description: "Production-ready Node.js + TypeScript REST API template with JWT auth, rate limiting, request validation, and Docker configuration.", tags: ["Node.js", "TypeScript", "Express", "JWT", "Docker", "Zod"], accent: "purple" as const, github: "/" },
  { title: "Realtime Chat App", description: "End-to-end encrypted real-time chat application with rooms, direct messages, file sharing, and read receipts using Socket.io.", tags: ["React", "Socket.io", "Node.js", "MongoDB", "Redis"], accent: "cyan" as const, github: "/" },
];

const principles = [
  "TypeScript-first approach",
  "Component-driven architecture",
  "Server-side rendering by default",
  "Optimistic UI patterns",
  "Accessibility (WCAG) compliant",
  "Edge-ready deployments",
];

const codeSnippet = `// Next.js 14 Server Action with Prisma
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createProject(
  formData: FormData
) {
  "use server";

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  const project = await prisma.project.create({
    data: {
      title,
      description,
      createdAt: new Date(),
    },
  });

  revalidatePath("/projects");
  return { success: true, id: project.id };
}`;

const colorMap: Record<string, string> = {
  cyan:   "dark:text-cyan-400 text-cyan-600",
  green:  "dark:text-green-400 text-green-600",
  purple: "dark:text-purple-400 text-purple-600",
  orange: "dark:text-orange-400 text-orange-600",
};
const borderColorMap: Record<string, string> = {
  cyan:   "border-cyan-500/20",
  green:  "border-green-500/20",
  purple: "border-purple-500/20",
  orange: "border-orange-500/20",
};
const bgColorMap: Record<string, string> = {
  cyan:   "bg-cyan-500/10",
  green:  "bg-green-500/10",
  purple: "bg-purple-500/10",
  orange: "bg-orange-500/10",
};

export default function WebDevPage() {
  return (
    <div className="relative min-h-screen">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 dark:bg-[#090909] bg-gray-50" />
        {/* Aurora orbs */}
        <div className="absolute top-[-80px] left-[-100px] w-[500px] h-[500px] rounded-full dark:bg-cyan-500/8 bg-cyan-400/6 blur-3xl pointer-events-none" style={{ animation: "auroraMove 14s ease-in-out infinite" }} />
        <div className="absolute bottom-0 right-[-80px] w-[350px] h-[350px] rounded-full dark:bg-blue-500/6 bg-blue-400/4 blur-3xl pointer-events-none" style={{ animation: "auroraMove 18s ease-in-out infinite reverse" }} />
        <GridBackground variant="grid" className="opacity-40" />

        <motion.div
          className="relative z-10 max-w-5xl mx-auto px-6"
          variants={stagger(0.1, 0)}
          initial="hidden"
          animate="show"
        >
          {/* Back link */}
          <motion.div variants={fadeUp}>
            <Link href="/" className="inline-flex items-center gap-2 font-mono text-sm dark:text-gray-500 text-gray-400 hover:text-[var(--accent-cyan)] transition-colors duration-300 mb-10 group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
              cd ~/home
            </Link>
          </motion.div>

          {/* Domain badge */}
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1 rounded-full dark:bg-cyan-500/10 bg-cyan-50 dark:border dark:border-cyan-500/20 border border-cyan-500/30 dark:text-cyan-400 text-cyan-600">
              <Code2 size={11} /> domain_01 / web-development
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Icon + title */}
              <motion.div variants={fadeUp} className="flex items-center gap-4 mb-5">
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Globe size={30} className="dark:text-cyan-400 text-cyan-600" />
                </motion.div>
                <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                  <span className="dark:text-white text-gray-900">Web</span>{" "}
                  <span className="dark:text-cyan-400 text-cyan-600">Dev</span>
                </h1>
              </motion.div>

              <motion.p variants={fadeUp} className="text-base text-[var(--text-secondary)] leading-relaxed mb-8 font-light max-w-lg">
                Building performant, accessible, and beautiful web applications from pixel-perfect frontends to scalable backend architectures. I ship production-grade software with{" "}
                <span className="dark:text-cyan-400 text-cyan-600 font-semibold">Next.js</span>,{" "}
                <span className="dark:text-cyan-400 text-cyan-600 font-semibold">TypeScript</span>, and modern tooling.
              </motion.p>

              {/* Tags */}
              <motion.div variants={stagger(0.06)} className="flex flex-wrap gap-2">
                {["Full Stack", "React / Next.js", "TypeScript", "REST APIs", "Databases", "DevOps"].map((tag) => (
                  <motion.span
                    key={tag}
                    variants={scaleIn}
                    className="font-mono text-xs px-3 py-1.5 rounded-lg border dark:border-cyan-500/20 border-cyan-500/30 dark:bg-cyan-500/10 bg-cyan-50 dark:text-cyan-400 text-cyan-600"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Hero visual — floating browser mockup */}
            <motion.div
              variants={fadeLeft}
              className="hidden lg:block relative"
              style={{ animation: "floatY 7s ease-in-out infinite" }}
            >
              <div className="rounded-2xl overflow-hidden border dark:border-[#1a1a2e] border-gray-200 dark:bg-[#0d0d1a] bg-white shadow-2xl dark:shadow-[0_30px_80px_rgba(0,0,0,0.7),0_0_30px_rgba(0,245,255,0.05)]">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 dark:bg-[#1a1a2e] bg-gray-100 border-b dark:border-[#2a2a3e] border-gray-200">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbe2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#2ac142]" />
                  <div className="flex-1 mx-4 h-5 rounded-md dark:bg-[#0a0a0f] bg-gray-200 flex items-center px-2">
                    <span className="font-mono text-xs dark:text-gray-600 text-gray-400">localhost:3000</span>
                  </div>
                </div>
                {/* Page preview */}
                <div className="p-4 space-y-3 font-mono text-xs">
                  <div className="h-6 rounded dark:bg-cyan-500/20 bg-cyan-100 w-2/3" />
                  <div className="h-3 rounded dark:bg-white/5 bg-gray-100 w-full" />
                  <div className="h-3 rounded dark:bg-white/5 bg-gray-100 w-5/6" />
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {["cyan", "purple", "green"].map((c) => (
                      <div key={c} className={`h-16 rounded-lg dark:bg-${c}-500/10 bg-${c}-50 border dark:border-${c}-500/20 border-${c}-200`} />
                    ))}
                  </div>
                  <div className="flex gap-2 pt-1">
                    <div className="h-8 rounded-lg dark:bg-cyan-500/20 bg-cyan-100 w-24" />
                    <div className="h-8 rounded-lg dark:bg-white/5 bg-gray-100 w-20" />
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -right-4 px-3 py-2 rounded-xl dark:bg-[#0f0f1a] bg-white border dark:border-cyan-500/30 border-cyan-200 shadow-lg"
              >
                <div className="font-mono text-xs dark:text-cyan-400 text-cyan-600 flex items-center gap-1.5">
                  <Sparkles size={11} /> 100 Lighthouse Score
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── Skills Grid ────────────────────────────────────── */}
      <FadeSection className="relative py-24" variants={stagger(0.12)}>
        <div className="absolute inset-0 dark:bg-[#0a0a0f] bg-white" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.div variants={fadeUp} className="mb-12">
            <div className="font-mono text-sm dark:text-cyan-400 text-cyan-600 mb-2 flex items-center gap-2">
              <span className="dark:text-gray-500 text-gray-400">// </span>tech_stack
            </div>
            <h2 className="text-3xl font-bold text-[var(--text-primary)]">Technologies I Work With</h2>
          </motion.div>

          <motion.div variants={stagger(0.1)} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {skills.map((group, i) => {
              const Icon = group.icon;
              return (
                <motion.div
                  key={group.category}
                  variants={fadeUp}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`rounded-xl border dark:border-[#1a1a2e] border-gray-200 dark:bg-[#0f0f1a] bg-gray-50 p-5 transition-all duration-300 hover:${borderColorMap[group.color]} dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]`}
                >
                  <div className={`flex items-center gap-2 font-mono text-sm font-semibold mb-4 ${colorMap[group.color]}`}>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${bgColorMap[group.color]} border ${borderColorMap[group.color]}`}>
                      <Icon size={13} />
                    </div>
                    {group.category}
                  </div>
                  <motion.div
                    variants={stagger(0.05, i * 0.05)}
                    className="flex flex-wrap gap-1.5"
                  >
                    {group.items.map((item) => (
                      <motion.div key={item} variants={scaleIn}>
                        <SkillBadge name={item} variant={group.color} size="sm" />
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </FadeSection>

      {/* ── Code + Principles ──────────────────────────────── */}
      <FadeSection className="relative py-24" variants={stagger(0.12)}>
        <div className="absolute inset-0 dark:bg-[#090909] bg-gray-50" />
        {/* Subtle glow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 dark:bg-cyan-500/4 bg-cyan-400/3 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Left — principles */}
            <motion.div variants={fadeRight}>
              <div className="font-mono text-sm dark:text-cyan-400 text-cyan-600 mb-2 flex items-center gap-2">
                <span className="dark:text-gray-500 text-gray-400">// </span>code_style
              </div>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4 leading-tight">
                Clean, Typed &amp; <span className="dark:text-cyan-400 text-cyan-600">Scalable</span> Code
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-8 font-light">
                I write code that other developers enjoy working with. Strong typing with TypeScript, server actions for mutations, and proper separation of concerns are my defaults — not afterthoughts.
              </p>

              <motion.ul variants={stagger(0.08)} className="space-y-3">
                {principles.map((item) => (
                  <motion.li
                    key={item}
                    variants={fadeUp}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 transition-colors duration-200">
                      <CheckCircle2 size={12} className="dark:text-cyan-400 text-cyan-600" />
                    </div>
                    <span className="text-sm text-[var(--text-secondary)] font-light">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Stack highlight pills */}
              <motion.div variants={fadeUp} className="mt-8 flex items-center gap-2">
                {[
                  { label: "React", sub: "UI" },
                  { label: "Node.js", sub: "API" },
                  { label: "Postgres", sub: "DB" },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col items-center px-4 py-2.5 rounded-xl border dark:border-[#1a1a2e] border-gray-200 dark:bg-[#0f0f1a] bg-white min-w-[70px]">
                    <span className="font-semibold text-sm dark:text-white text-gray-800">{s.label}</span>
                    <span className="font-mono text-xs dark:text-gray-500 text-gray-400">{s.sub}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — code block */}
            <motion.div variants={fadeLeft}>
              <div className="rounded-xl overflow-hidden border dark:border-[#1a1a2e] border-gray-200 shadow-2xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                {/* Header */}
                <div className="flex items-center gap-2 px-4 py-3 dark:bg-[#1a1a2e] bg-gray-100 border-b dark:border-[#2a2a3e] border-gray-200">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbe2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#2ac142]" />
                  <span className="font-mono text-xs dark:text-[#546e7a] text-gray-400 ml-2">actions.ts</span>
                  <span className="ml-auto font-mono text-xs px-2 py-0.5 rounded dark:bg-cyan-500/20 bg-cyan-100 dark:text-cyan-400 text-cyan-600">TypeScript</span>
                </div>
                {/* Code */}
                <div className="dark:bg-[#0d0d1a] bg-[#fafafa] p-5 overflow-x-auto">
                  <pre className="font-mono text-xs leading-relaxed">
                    {codeSnippet.split("\n").map((line, i) => {
                      const h = line
                        .replace(/(\/\/.*)/g, '<span class="syntax-comment">$1</span>')
                        .replace(/("use server"|"use client")/g, '<span class="syntax-string">$1</span>')
                        .replace(/\b(import|export|async|await|const|from|return|new)\b/g, '<span class="syntax-keyword">$1</span>')
                        .replace(/("(?:[^"\\]|\\.)*")/g, '<span class="syntax-string">$1</span>')
                        .replace(/\b(FormData|Date|string|boolean|number)\b/g, '<span class="syntax-type">$1</span>');
                      return (
                        <div key={i} className="flex hover:dark:bg-white/4 hover:bg-black/4 rounded px-1 transition-colors">
                          <span className="select-none w-7 dark:text-gray-700 text-gray-300 text-right mr-4 shrink-0">{i + 1}</span>
                          <span className="dark:text-gray-300 text-gray-700" dangerouslySetInnerHTML={{ __html: h }} />
                        </div>
                      );
                    })}
                  </pre>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </FadeSection>

      {/* ── Projects ───────────────────────────────────────── */}
      <FadeSection className="relative py-24" variants={stagger(0.1)}>
        <div className="absolute inset-0 dark:bg-[#0a0a0f] bg-white" />
        <GridBackground variant="dots" className="opacity-20 dark:opacity-30" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.div variants={fadeUp} className="flex items-end justify-between mb-12">
            <div>
              <div className="font-mono text-sm dark:text-cyan-400 text-cyan-600 mb-2 flex items-center gap-2">
                <span className="dark:text-gray-500 text-gray-400">// </span>projects
              </div>
              <h2 className="text-3xl font-bold text-[var(--text-primary)]">Featured Projects</h2>
            </div>
            <span className="font-mono text-xs dark:text-gray-600 text-gray-400 hidden sm:block">
              {projects.length} projects
            </span>
          </motion.div>

          <motion.div variants={stagger(0.12)} className="grid sm:grid-cols-2 gap-6">
            {projects.map((project) => (
              <motion.div key={project.title} variants={fadeUp}>
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </FadeSection>

      {/* ── Process / How I Work ───────────────────────────── */}
      <FadeSection className="relative py-24" variants={stagger(0.1)}>
        <div className="absolute inset-0 dark:bg-[#090909] bg-gray-50" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 dark:opacity-[0.03] select-none">
          <Cpu size={400} className="dark:text-cyan-400 text-cyan-600" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <div className="font-mono text-sm dark:text-cyan-400 text-cyan-600 mb-2 flex items-center justify-center gap-2">
              <span className="dark:text-gray-500 text-gray-400">// </span>workflow
            </div>
            <h2 className="text-3xl font-bold text-[var(--text-primary)]">How I Build</h2>
          </motion.div>

          <motion.div variants={stagger(0.1)} className="grid sm:grid-cols-4 gap-4">
            {[
              { num: "01", title: "Design",    desc: "Wireframe, component breakdown, design system setup",        color: "cyan" },
              { num: "02", title: "Build",     desc: "Type-safe components, API routes, database schema",          color: "green" },
              { num: "03", title: "Test",      desc: "Unit + integration tests, E2E flows, accessibility audit",   color: "purple" },
              { num: "04", title: "Ship",      desc: "CI/CD pipeline, edge deployment, performance monitoring",    color: "orange" },
            ].map((step) => (
              <motion.div
                key={step.num}
                variants={scaleIn}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-xl border dark:border-[#1a1a2e] border-gray-200 dark:bg-[#0f0f1a] bg-white p-5"
              >
                <div className={`font-mono text-2xl font-black mb-3 ${colorMap[step.color]}`}>{step.num}</div>
                <div className="font-semibold text-sm text-[var(--text-primary)] mb-2">{step.title}</div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed font-light">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </FadeSection>
    </div>
  );
}
