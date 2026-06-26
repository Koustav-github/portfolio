"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, Boxes, Activity, Blocks, Gauge, ShieldCheck, Network,
} from "lucide-react";
import Reveal, { fadeUp, stagger } from "@/components/Reveal";
import CodeBlock from "@/components/CodeBlock";
import ProjectCard from "@/components/ProjectCard";
import AmbientVideo from "@/components/AmbientVideo";
import StackCard from "@/components/StackCard";
import FlipText from "@/components/FlipText";

const accentVars = {
  ["--accent" as string]: "#d6a84a",
  ["--accent-soft" as string]: "rgba(214,168,74,0.12)",
  ["--accent-line" as string]: "rgba(214,168,74,0.32)",
};

const domainBar = [
  { k: "Focus", v: "System Design" },
  { k: "Trading", v: "Low-Latency / HFT" },
  { k: "Chain", v: "Ethereum / EVM" },
  { k: "Langs", v: "C++ · Solidity" },
];

const pillars = [
  {
    icon: Boxes,
    title: "System Design",
    desc: "Designing systems that scale — partitioning, caching, and the consistency trade-offs behind them.",
    points: ["Horizontal scaling & sharding", "Caching + CDN strategy", "Message queues (Kafka)", "CAP & consistency trade-offs"],
  },
  {
    icon: Activity,
    title: "HFT / Low-Latency",
    desc: "Trading systems where microseconds matter — from the order book down to cache lines.",
    points: ["Limit order book & matching", "Lock-free data structures", "Market-data ingestion", "Backtesting & risk checks"],
  },
  {
    icon: Blocks,
    title: "Blockchain",
    desc: "Smart contracts and DeFi protocols on Ethereum and EVM-compatible chains.",
    points: ["Gas-optimized Solidity", "Reentrancy-safe patterns", "DeFi (AMMs, vaults)", "Foundry fuzz testing"],
  },
];

const stack = [
  { group: "System Design", items: ["Distributed Systems", "Caching", "Kafka", "Redis", "Load Balancing", "Sharding"] },
  { group: "HFT / Latency", items: ["C++", "Order Books", "Backtesting", "Market Data", "WebSockets", "Lock-Free"] },
  { group: "Blockchain", items: ["Solidity", "Foundry", "Ethereum", "DeFi", "Web3", "OpenZeppelin"] },
  { group: "Infra", items: ["Docker", "Postgres", "gRPC", "Linux", "Prometheus"] },
];

const projects = [
  { title: "FundMe", description: "A crowdfunding smart contract on Ethereum, built with Solidity and Foundry.", tags: ["Solidity", "Foundry", "Ethereum"], github: "https://github.com/Koustav-github?tab=repositories", featured: true },
  { title: "Exam Management", description: "An exam management system built in Python with Mako templates.", tags: ["Python", "Mako", "SQL"], github: "https://github.com/Koustav-github/ExamManagement" },
];

const focus = [
  { icon: Network, t: "Distributed Systems", d: "Sharding, replication, consensus, CAP trade-offs." },
  { icon: Gauge, t: "Low-Latency", d: "Lock-free structures, cache-aware code, kernel bypass." },
  { icon: ShieldCheck, t: "Smart Contracts", d: "Gas-optimized, reentrancy-safe Solidity with fuzz tests." },
  { icon: Activity, t: "Observability", d: "Metrics, tracing, and SLOs with Prometheus + Grafana." },
];

const code = `# Cache-aside read-through with Redis
import json
import redis

cache = redis.Redis(host="localhost", port=6379, decode_responses=True)
TTL = 300  # seconds

def get_user(user_id: str) -> dict:
    key = f"user:{user_id}"
    cached = cache.get(key)
    if cached:
        return json.loads(cached)            # cache hit

    user = db.fetch_user(user_id)            # miss -> source of truth
    cache.set(key, json.dumps(user), ex=TTL) # populate cache
    return user

def invalidate(user_id: str) -> None:
    cache.delete(f"user:{user_id}")          # write-through invalidation`;

export default function OthersPage() {
  return (
    <div className="relative" style={accentVars}>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
        <AmbientVideo
          src="/Blockchain.mp4"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[58%] w-full object-cover opacity-[0.15]"
          style={{
            WebkitMaskImage: "linear-gradient(to top, transparent 2%, #000 30%, #000 80%, transparent 100%)",
            maskImage: "linear-gradient(to top, transparent 2%, #000 30%, #000 80%, transparent 100%)",
          }}
        />
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
                  Thread 03 — Others
                </motion.p>
                <motion.h1 variants={fadeUp} className="font-display text-[clamp(2.6rem,8vw,5.5rem)] text-fg">
                  Systems, markets
                  <br />
                  <span style={{ color: "var(--accent)" }}>&amp; chains.</span>
                </motion.h1>
                <motion.p variants={fadeUp} className="mt-7 max-w-lg text-pretty leading-relaxed text-fg-mute">
                  The rest of the stack I care about — scalable system design,
                  low-latency trading systems, and Ethereum smart contracts. The hard,
                  performance-critical corners.
                </motion.p>
                <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-1.5">
                  {["System Design", "HFT", "Blockchain", "Distributed", "Low-Latency"].map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </motion.div>
              </div>

              <motion.div variants={fadeUp} className="hidden lg:block">
                <PillarsVisual />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Domain bar ────────────────────────────────────── */}
      <Reveal className="border-b border-line">
        <div className="mx-auto grid max-w-shell grid-cols-2 gap-px overflow-hidden wrap-gutter sm:grid-cols-4">
          {domainBar.map((s) => (
            <motion.div key={s.k} variants={fadeUp} className="py-6">
              <div className="eyebrow mb-1.5">{s.k}</div>
              <div className="font-mono text-sm text-fg">{s.v}</div>
            </motion.div>
          ))}
        </div>
      </Reveal>

      {/* ── Pillars ───────────────────────────────────────── */}
      <Reveal className="mx-auto max-w-shell wrap-gutter py-20">
        <motion.h2 variants={fadeUp} className="eyebrow mb-10">Three threads</motion.h2>
        <div className="focus-dim grid gap-4 lg:grid-cols-3">
          {pillars.map((p, i) => {
            return (
              <motion.div key={p.title} variants={fadeUp} className="group relative flex flex-col overflow-hidden border border-line p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1.5 hover:border-line-strong">
                {/* accent edge — slides in on hover */}
                <span className="pointer-events-none absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100" style={{ background: "var(--accent)" }} />
                {/* chronological number — fades in at bottom-left on hover */}
                <span aria-hidden className="pointer-events-none absolute -bottom-4 -left-1 font-display text-[5.5rem] leading-none opacity-0 transition-opacity duration-300 group-hover:opacity-[0.14]" style={{ color: "var(--accent)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative">
                  <h3 className="font-display text-xl text-fg">
                    <FlipText label={p.title} light="var(--accent)" />
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-mute">{p.desc}</p>
                  <ul className="mt-4 space-y-2">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2.5 text-sm text-fg-mute">
                        <span className="h-1 w-1 rounded-full" style={{ background: "var(--accent)" }} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Reveal>

      {/* ── Stack ─────────────────────────────────────────── */}
      <Reveal className="mx-auto max-w-shell wrap-gutter py-20">
        <motion.h2 variants={fadeUp} className="eyebrow mb-10">Toolkit</motion.h2>
        <div className="focus-dim grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stack.map((s) => (
            <motion.div key={s.group} variants={fadeUp}>
              <StackCard title={s.group} items={s.items} color="var(--accent)" />
            </motion.div>
          ))}
        </div>
      </Reveal>

      {/* ── Code ──────────────────────────────────────────── */}
      <Reveal className="mx-auto max-w-shell wrap-gutter py-20">
        <motion.div variants={fadeUp} className="mb-8">
          <h2 className="eyebrow mb-3">System design</h2>
          <p className="font-display text-3xl leading-tight text-fg">Architecture, cached with Redis.</p>
        </motion.div>
        <motion.div variants={fadeUp}>
          <CodeBlock code={code} filename="cache.py" lang="py" label="Python" maxHeight={460} />
        </motion.div>
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

      {/* ── Focus ─────────────────────────────────────────── */}
      <Reveal className="mx-auto max-w-shell wrap-gutter py-20">
        <motion.h2 variants={fadeUp} className="eyebrow mb-10">Focus</motion.h2>
        <div className="focus-dim grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {focus.map((s, i) => (
            <motion.div key={s.t} variants={fadeUp} className="group relative flex flex-col overflow-hidden border border-line p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1.5 hover:border-line-strong">
              {/* accent edge — slides in on hover */}
              <span className="pointer-events-none absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100" style={{ background: "var(--accent)" }} />
              {/* chronological number — fades in at bottom-left on hover */}
              <span aria-hidden className="pointer-events-none absolute -bottom-4 -left-1 font-display text-[5.5rem] leading-none opacity-0 transition-opacity duration-300 group-hover:opacity-[0.14]" style={{ color: "var(--accent)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative">
                <h3 className="font-mono text-sm text-fg">
                  <FlipText label={s.t} light="var(--accent)" />
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-mute">{s.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

/* ── Pillars visual ───────────────────────────────────────── */
function PillarsVisual() {
  const rows = [
    { icon: Boxes, label: "System Design", tag: "scale" },
    { icon: Activity, label: "HFT / Low-Latency", tag: "speed" },
    { icon: Blocks, label: "Blockchain", tag: "trust" },
  ];
  return (
    <div className="overflow-hidden rounded-[6px] border border-line bg-raised shadow-2xl">
      <div className="flex items-center justify-between border-b border-line bg-surface px-4 py-2.5">
        <span className="font-mono text-[11px] text-fg-mute">others · index</span>
        <span className="flex items-center gap-1.5 font-mono text-[11px]" style={{ color: "var(--accent)" }}>
          <span className="live-dot h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} /> 3 threads
        </span>
      </div>
      <div className="space-y-px overflow-hidden bg-line">
        {rows.map((r) => {
          const Icon = r.icon;
          return (
            <div key={r.label} className="flex items-center gap-3 bg-raised px-4 py-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[5px] border border-line bg-bg" style={{ color: "var(--accent)" }}>
                <Icon size={16} />
              </span>
              <span className="flex-1 font-mono text-sm text-fg">{r.label}</span>
              <span
                className="rounded-full border px-2 py-0.5 font-mono text-[10px]"
                style={{ color: "var(--accent)", borderColor: "var(--accent-line)" }}
              >
                {r.tag}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
