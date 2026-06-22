"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Mail, Linkedin, GitBranchIcon } from "lucide-react";
import Reveal, { fadeUp, stagger } from "@/components/Reveal";

/* ── Data ─────────────────────────────────────────────────── */
const disciplines = [
  {
    idx: "01",
    href: "/webdev",
    name: "Web Development",
    accent: "var(--web)",
    blurb: "Full-stack applications with Next.js, TypeScript, and Node — from the interface down to the database.",
    stack: ["Next.js", "React", "TypeScript", "Node", "Postgres"],
  },
  {
    idx: "02",
    href: "/blockchain",
    name: "Blockchain",
    accent: "var(--chain)",
    blurb: "Solidity smart contracts and DeFi protocols on Ethereum and EVM-compatible chains.",
    stack: ["Solidity", "Ethereum", "Foundry", "DeFi", "Web3"],
  },
  {
    idx: "03",
    href: "/agentic-ai",
    name: "Agentic AI",
    accent: "var(--ai)",
    blurb: "Autonomous agents and RAG pipelines with LangGraph, vector search, and frontier models.",
    stack: ["LangGraph", "RAG", "LangChain", "Vector DBs"],
  },
];

const meta = [
  { k: "Role", v: "Software Engineer" },
  { k: "Focus", v: "Web · Chain · AI" },
  { k: "Based", v: "Jadavpur University, IN" },
];

const stackGroups = [
  { label: "Languages", items: ["TypeScript", "Python", "Solidity", "SQL"] },
  { label: "Web", items: ["Next.js", "React", "Node", "FastAPI", "Tailwind"] },
  { label: "Chain", items: ["Foundry", "Hardhat", "Ethers.js", "OpenZeppelin"] },
  { label: "AI", items: ["LangGraph", "LangChain", "pgvector", "OpenAI", "Claude"] },
  { label: "Infra", items: ["Docker", "Postgres", "Redis", "Vercel", "Git"] },
];

const contacts = [
  { label: "GitHub", value: "Koustav Manna", href: "https://www.github.com/Koustav-github", icon: GitBranchIcon },
  { label: "Email", value: "koustav.2005.manna@gmail.com", href: "mailto:koustav.2005.manna@gmail.com", icon: Mail },
  { label: "LinkedIn", value: "Koustav Manna", href: "https://www.linkedin.com/in/koustav-manna-b6a64330b/", icon: Linkedin },
  { label: "X", value: "Koustav Manna", href: "https://x.com/KoustavMan51112", icon: ArrowUpRight },
];

/* ── Page ─────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div className="relative">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-shell wrap-gutter pb-20 pt-36 sm:pt-44">
          <motion.div variants={stagger(0.09, 0.05)} initial="hidden" animate="show">
            <motion.p variants={fadeUp} className="eyebrow mb-7 flex items-center gap-2">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-chain2" />
              Open to work · Software Engineer
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="font-display text-[clamp(2.9rem,11vw,8.5rem)] text-fg"
            >
              Koustav
              <br />
              Manna
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-2xl text-balance text-lg leading-relaxed text-fg-mute sm:text-xl"
            >
              I build software across three disciplines —{" "}
              <Link href="/webdev" className="text-fg underline decoration-web decoration-2 underline-offset-4 transition-colors hover:text-web">
                full-stack web
              </Link>
              ,{" "}
              <Link href="/blockchain" className="text-fg underline decoration-chain decoration-2 underline-offset-4 transition-colors hover:text-chain">
                Ethereum smart contracts
              </Link>
              , and{" "}
              <Link href="/agentic-ai" className="text-fg underline decoration-ai decoration-2 underline-offset-4 transition-colors hover:text-ai">
                autonomous AI agents
              </Link>
              .
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-3">
              <a href="#index" className="btn btn-solid">
                Browse the work <ArrowRight size={15} />
              </a>
              <a href="#contact" className="btn btn-ghost">
                Get in touch
              </a>
            </motion.div>

            {/* meta strip */}
            <motion.dl
              variants={fadeUp}
              className="mt-16 grid max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-3"
            >
              {meta.map((m) => (
                <div key={m.k} className="bg-bg px-5 py-4">
                  <dt className="eyebrow mb-1.5">{m.k}</dt>
                  <dd className="font-mono text-sm text-fg">{m.v}</dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>
        </div>
      </section>

      {/* ── Index (signature) ─────────────────────────────── */}
      <Reveal id="index" className="mx-auto max-w-shell wrap-gutter py-20">
        <motion.div variants={fadeUp} className="mb-10 flex items-baseline justify-between">
          <h2 className="eyebrow">Index — Disciplines</h2>
          <span className="font-mono text-xs text-fg-faint">3 / threads</span>
        </motion.div>

        <div className="border-t border-line">
          {disciplines.map((d) => (
            <motion.div key={d.href} variants={fadeUp} style={{ ["--accent" as string]: d.accent }}>
              <Link
                href={d.href}
                className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-3 border-b border-line py-7 transition-colors sm:grid-cols-[5rem_minmax(0,14rem)_1fr_auto] sm:gap-x-8"
              >
                <span className="pointer-events-none absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-y-100" />

                <span className="font-mono text-sm text-fg-faint tabular-nums transition-colors group-hover:text-accent sm:pl-2">
                  {d.idx}
                </span>

                <h3 className="font-display text-3xl text-fg transition-colors duration-300 group-hover:text-accent sm:text-4xl">
                  {d.name}
                </h3>

                <p className="col-span-2 max-w-md text-sm leading-relaxed text-fg-mute sm:col-span-1 sm:max-w-none">
                  {d.blurb}
                  <span className="mt-3 flex flex-wrap gap-1.5">
                    {d.stack.map((s) => (
                      <span key={s} className="chip">{s}</span>
                    ))}
                  </span>
                </p>

                <span className="hidden h-11 w-11 place-items-center rounded-full border border-line text-fg-mute transition-all duration-300 group-hover:border-accent group-hover:text-accent sm:grid">
                  <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </Reveal>

      {/* ── About + stats ─────────────────────────────────── */}
      <Reveal className="mx-auto max-w-shell wrap-gutter py-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <motion.div variants={fadeUp}>
            <h2 className="eyebrow mb-6">About</h2>
            <p className="font-display text-2xl leading-tight text-fg sm:text-3xl">
              A mechanical engineering student who builds software, working where
              the web, blockchains, and AI overlap.
            </p>
            <div className="mt-6 space-y-4 text-pretty leading-relaxed text-fg-mute">
              <p>
                I&apos;m studying Mechanical Engineering at Jadavpur University, but my
                work lives in code. I write smart contracts on Ethereum, ship
                production web apps with Next.js, and design agentic AI systems with
                LangGraph and RAG.
              </p>
              <p>
                The engineering background is the through-line: I approach problems
                with systems thinking and reason from first principles, whether the
                target is a gas-optimized contract or a retrieval pipeline.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-3 gap-px overflow-hidden self-start rounded-[4px] border border-line bg-line">
            {[
              { n: "3", l: "Disciplines" },
              { n: "10+", l: "Projects" },
              { n: "18+", l: "Tools" },
            ].map((s) => (
              <div key={s.l} className="bg-bg px-4 py-7 text-center">
                <div className="font-display text-4xl text-fg">{s.n}</div>
                <div className="eyebrow mt-2">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </Reveal>

      {/* ── Stack ─────────────────────────────────────────── */}
      <Reveal className="mx-auto max-w-shell wrap-gutter py-20">
        <motion.h2 variants={fadeUp} className="eyebrow mb-10">Stack</motion.h2>
        <div className="divide-y divide-line border-y border-line">
          {stackGroups.map((g) => (
            <motion.div
              key={g.label}
              variants={fadeUp}
              className="grid grid-cols-1 gap-4 py-5 sm:grid-cols-[8rem_1fr] sm:items-center"
            >
              <span className="font-mono text-sm text-fg-faint">{g.label}</span>
              <div className="flex flex-wrap gap-1.5">
                {g.items.map((i) => (
                  <span key={i} className="chip">{i}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Reveal>

      {/* ── Contact ───────────────────────────────────────── */}
      <Reveal id="contact" className="mx-auto max-w-shell wrap-gutter py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-end">
          <motion.div variants={fadeUp}>
            <h2 className="eyebrow mb-6">Contact</h2>
            <p className="font-display text-3xl leading-tight text-fg sm:text-5xl">
              Have something to build?
            </p>
            <p className="mt-5 max-w-md leading-relaxed text-fg-mute">
              I&apos;m open to internships, freelance work, and collaborations across
              web, blockchain, and AI. The fastest way to reach me is email.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="border-t border-line">
            {contacts.map((c) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 border-b border-line py-5 transition-colors hover:bg-surface"
                >
                  <Icon size={18} className="text-fg-faint transition-colors group-hover:text-fg" />
                  <div className="min-w-0 flex-1">
                    <div className="eyebrow mb-0.5">{c.label}</div>
                    <div className="truncate font-mono text-sm text-fg">{c.value}</div>
                  </div>
                  <ArrowUpRight size={16} className="text-fg-faint transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg" />
                </a>
              );
            })}
          </motion.div>
        </div>
      </Reveal>
    </div>
  );
}
