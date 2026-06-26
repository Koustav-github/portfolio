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
  { title: "Low-Latency Order Book", description: "A limit-order-book matching engine in C++ with lock-free queues and nanosecond-scale microbenchmarks.", tags: ["C++", "Lock-Free", "Order Book", "Benchmarks"], github: "/", featured: true },
  { title: "Distributed Rate Limiter", description: "Sharded token-bucket rate limiter on Redis with sliding windows and graceful degradation under load.", tags: ["Redis", "System Design", "Go", "Sharding"], github: "/" },
  { title: "Market Data Pipeline", description: "Real-time market-data ingestion over WebSockets with normalization and a replayable event log.", tags: ["WebSockets", "Kafka", "Python", "Time-Series"], github: "/" },
  { title: "DeFi Yield Aggregator", description: "Gas-optimized yield router that rebalances across Aave and Compound to maximize depositor APY.", tags: ["Solidity", "Foundry", "Aave", "Ethers.js"], github: "/" },
];

const focus = [
  { icon: Network, t: "Distributed Systems", d: "Sharding, replication, consensus, CAP trade-offs." },
  { icon: Gauge, t: "Low-Latency", d: "Lock-free structures, cache-aware code, kernel bypass." },
  { icon: ShieldCheck, t: "Smart Contracts", d: "Gas-optimized, reentrancy-safe Solidity with fuzz tests." },
  { icon: Activity, t: "Observability", d: "Metrics, tracing, and SLOs with Prometheus + Grafana." },
];

const code = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title SimpleStaking - stake tokens, earn rewards
contract SimpleStaking is ReentrancyGuard, Ownable {
    IERC20 public immutable stakingToken;
    uint256 public rewardRate = 100; // per block

    mapping(address => uint256) public stakedBalance;
    mapping(address => uint256) public lastClaimBlock;

    event Staked(address indexed user, uint256 amount);

    constructor(address _token) Ownable(msg.sender) {
        stakingToken = IERC20(_token);
    }

    function stake(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be > 0");
        _claimRewards();
        stakingToken.transferFrom(msg.sender, address(this), amount);
        stakedBalance[msg.sender] += amount;
        emit Staked(msg.sender, amount);
    }

    function pendingRewards(address user) public view returns (uint256) {
        uint256 blocks = block.number - lastClaimBlock[user];
        return (stakedBalance[user] * rewardRate * blocks) / 1e18;
    }
}`;

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
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <motion.div key={p.title} variants={fadeUp} className="card p-6">
                <span className="grid h-10 w-10 place-items-center rounded-[6px]" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>
                  <Icon size={18} />
                </span>
                <h3 className="mt-4 font-display text-xl text-fg">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-mute">{p.desc}</p>
                <ul className="mt-4 space-y-2">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2.5 text-sm text-fg-mute">
                      <span className="h-1 w-1 rounded-full" style={{ background: "var(--accent)" }} />
                      {pt}
                    </li>
                  ))}
                </ul>
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
          <h2 className="eyebrow mb-3">Smart contracts</h2>
          <p className="font-display text-3xl leading-tight text-fg">Gas-optimized Solidity.</p>
        </motion.div>
        <motion.div variants={fadeUp}>
          <CodeBlock code={code} filename="SimpleStaking.sol" lang="sol" label="Solidity" maxHeight={460} />
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
        <div className="grid gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {focus.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.t} variants={fadeUp} className="bg-bg p-6">
                <Icon size={18} style={{ color: "var(--accent)" }} />
                <div className="mt-4 font-mono text-sm text-fg">{s.t}</div>
                <p className="mt-2 text-sm leading-relaxed text-fg-mute">{s.d}</p>
              </motion.div>
            );
          })}
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
