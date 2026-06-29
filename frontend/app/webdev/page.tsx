"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, Lock, Check, Monitor, Server, Database, Wrench,
} from "lucide-react";
import Reveal, { fadeUp, stagger } from "@/components/Reveal";
import CodeBlock from "@/components/CodeBlock";
import ProjectCard from "@/components/ProjectCard";
import ParallaxPortrait from "@/components/ParallaxPortrait";
import StackCard from "@/components/StackCard";
import FlipText from "@/components/FlipText";

const accentVars = {
  ["--accent" as string]: "#5ea9d6",
  ["--accent-soft" as string]: "rgba(94,169,214,0.12)",
  ["--accent-line" as string]: "rgba(94,169,214,0.32)",
};

const stack = [
  { group: "Frontend", icon: Monitor, items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Zustand"] },
  { group: "Backend", icon: Server, items: ["Node.js", "Express", "FastAPI", "REST", "GraphQL", "WebSockets"] },
  { group: "Data", icon: Database, items: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase"] },
  { group: "Tooling", icon: Wrench, items: ["Docker", "Vercel", "CI/CD", "Jest", "Vitest", "Git"] },
];

const principles = [
  "TypeScript-first, end to end",
  "Component-driven architecture",
  "Server rendering by default",
  "Optimistic UI for mutations",
  "WCAG-compliant, keyboard-first",
  "Edge-ready deployments",
];

const projects = [
  { title: "Penny", description: "An all-in-one money management app — track, manage, invest, and grow. Makes personal finance simple with strategy guidance for your situation.", tags: ["TypeScript", "Next.js", "Python", "FastAPI"], github: "https://github.com/Koustav-github/Penny", live: "https://penny-orpin.vercel.app", featured: true, image: "/Penny.webp" },
  { title: "Trajectory 2K26", description: "Official website for Trajectory 2026, built with Next.js and TypeScript.", tags: ["Next.js", "TypeScript", "CSS"], github: "https://github.com/Koustav-github/TRAJECTORY_2k26", live: "https://www.trajectoryjume.com/", image: "/Trajectory.webp" },
  { title: "SnapSyntax", description: "Hackathon build for Srijan '26 (SnapSyntax) — a Next.js + TypeScript web app.", tags: ["Next.js", "TypeScript", "Hackathon"], github: "https://github.com/Koustav-github/Srijan26_SnapSyntax3_AITookOurJob", live: "https://srijan26-snap-syntax3-ai-took-our-j.vercel.app", image: "/Snap_syntax.webp" },
  { title: "Portfolio", description: "This very portfolio — Next.js, TypeScript, Tailwind, and Framer Motion.", tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"], github: "https://github.com/Koustav-github/portfolio", live: "https://koustav-manna.dev", image: "/portfolio.webp" },
];

const workflow = [
  { n: "01", t: "Design", d: "Wireframe, component breakdown, design-system setup." },
  { n: "02", t: "Build", d: "Type-safe components, API routes, database schema." },
  { n: "03", t: "Test", d: "Unit + integration, E2E flows, accessibility audit." },
  { n: "04", t: "Ship", d: "CI/CD pipeline, edge deploy, performance monitoring." },
];

const code = `// Next.js Server Action with Prisma
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createProject(formData: FormData) {
  "use server";

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  const project = await prisma.project.create({
    data: { title, description, createdAt: new Date() },
  });

  revalidatePath("/projects");
  return { success: true, id: project.id };
}`;

export default function WebDevPage() {
  return (
    <div className="relative" style={accentVars}>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
        {/* centered parallax backdrop, a touch more visible than the video */}
        <ParallaxPortrait src="/webdev.webp" opacity={0.24} align="center" />
        <div className="relative z-10 mx-auto max-w-shell wrap-gutter pb-16 pt-32 sm:pt-40">
          <motion.div variants={stagger(0.08, 0.05)} initial="hidden" animate="show">
            <motion.div variants={fadeUp}>
              <Link href="/" className="inline-flex items-center gap-2 font-mono text-xs text-fg-faint transition-colors hover:text-fg">
                <ArrowLeft size={13} /> index
              </Link>
            </motion.div>

            <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
              <div>
                <motion.p variants={fadeUp} className="eyebrow mb-5" style={{ color: "var(--accent)" }}>
                  Thread 01 — Web Development
                </motion.p>
                <motion.h1 variants={fadeUp} className="font-display text-[clamp(2.6rem,8vw,5.5rem)] text-fg">
                  The full stack,
                  <br />
                  <span style={{ color: "var(--accent)" }}>end to end.</span>
                </motion.h1>
                <motion.p variants={fadeUp} className="mt-7 max-w-lg text-pretty leading-relaxed text-fg-mute">
                  Performant, accessible web applications — from pixel-precise interfaces
                  to scalable backends. I ship production software with Next.js,
                  TypeScript, and modern tooling.
                </motion.p>
                <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-1.5">
                  {["Full Stack", "Next.js", "TypeScript", "REST APIs", "DevOps"].map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </motion.div>
              </div>

              {/* viewport frame */}
              <motion.div variants={fadeUp} className="hidden lg:block">
                <BrowserFrame />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stack ─────────────────────────────────────────── */}
      <Reveal className="mx-auto max-w-shell wrap-gutter py-20">
        <motion.h2 variants={fadeUp} className="eyebrow mb-10">Stack</motion.h2>
        <div className="focus-dim grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stack.map((s) => (
            <motion.div key={s.group} variants={fadeUp}>
              <StackCard title={s.group} items={s.items} color="var(--accent)" icon={s.icon} />
            </motion.div>
          ))}
        </div>
      </Reveal>

      {/* ── Code + principles ─────────────────────────────── */}
      <Reveal className="mx-auto max-w-shell wrap-gutter py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          <motion.div variants={fadeUp}>
            <h2 className="eyebrow mb-5">How I write code</h2>
            <p className="font-display text-3xl leading-tight text-fg">
              Clean, typed, and built to scale.
            </p>
            <p className="mt-4 leading-relaxed text-fg-mute">
              Code other developers enjoy working with. Strong typing, server actions
              for mutations, and a clear separation of concerns — defaults, not
              afterthoughts.
            </p>
            <ul className="mt-7 space-y-3">
              {principles.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm text-fg-mute">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-[3px]" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>
                    <Check size={12} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeUp} className="min-w-0">
            <CodeBlock code={code} filename="actions.ts" lang="ts" label="TypeScript" />
          </motion.div>
        </div>
      </Reveal>

      {/* ── Projects ──────────────────────────────────────── */}
      <Reveal className="mx-auto max-w-shell wrap-gutter py-20">
        <motion.div variants={fadeUp} className="mb-10 flex items-baseline justify-between">
          <h2 className="eyebrow">Selected work</h2>
          <span className="font-mono text-xs text-fg-faint">{projects.length} projects</span>
        </motion.div>
        <div className="focus-dim grid gap-5 sm:grid-cols-2">
          {projects.map((p, i) => (
            <motion.div key={p.title} variants={fadeUp}>
              <ProjectCard index={i + 1} {...p} />
            </motion.div>
          ))}
        </div>
      </Reveal>

      {/* ── Workflow ──────────────────────────────────────── */}
      <Reveal className="mx-auto max-w-shell wrap-gutter py-20">
        <motion.h2 variants={fadeUp} className="eyebrow mb-10">How I ship</motion.h2>
        <div className="focus-dim grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {workflow.map((w) => (
            <motion.div key={w.n} variants={fadeUp} className="group relative flex min-h-[8.5rem] flex-col overflow-hidden border border-line p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1.5 hover:border-line-strong">
              <span className="pointer-events-none absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100" style={{ background: "var(--accent)" }} />
              {/* step number — fades in at bottom-left on hover */}
              <span aria-hidden className="pointer-events-none absolute -bottom-4 -left-1 font-display text-[5.5rem] leading-none opacity-0 transition-opacity duration-300 group-hover:opacity-[0.14]" style={{ color: "var(--accent)" }}>
                {w.n}
              </span>
              <div className="relative">
                <h3 className="font-mono text-sm text-fg">
                  <FlipText label={w.t} light="var(--accent)" />
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-mute">{w.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

/* ── Browser frame visual ─────────────────────────────────── */
function BrowserFrame() {
  return (
    <div className="overflow-hidden rounded-[6px] border border-line bg-raised shadow-2xl">
      <div className="flex items-center gap-3 border-b border-line bg-surface px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full border border-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full border border-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full border border-line-strong" />
        </div>
        <div className="flex flex-1 items-center gap-2 rounded-[3px] border border-line bg-bg px-2.5 py-1">
          <Lock size={10} className="text-fg-faint" />
          <span className="font-mono text-[11px] text-fg-mute">localhost:3000</span>
        </div>
        <div className="flex gap-1 font-mono text-[10px] text-fg-faint">
          <span className="rounded-[2px] px-1.5 py-0.5" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>lg</span>
          <span className="px-1.5 py-0.5">md</span>
          <span className="px-1.5 py-0.5">sm</span>
        </div>
      </div>
      <div className="space-y-3 p-5">
        <div className="h-7 w-2/3 rounded-[3px]" style={{ background: "var(--accent-soft)" }} />
        <div className="h-2.5 w-full rounded-full bg-surface" />
        <div className="h-2.5 w-5/6 rounded-full bg-surface" />
        <div className="grid grid-cols-3 gap-2.5 pt-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-16 rounded-[3px] border border-line bg-surface" />
          ))}
        </div>
        <div className="flex gap-2 pt-1">
          <div className="h-8 w-24 rounded-[3px]" style={{ background: "var(--accent)" }} />
          <div className="h-8 w-20 rounded-[3px] border border-line" />
        </div>
      </div>
    </div>
  );
}
