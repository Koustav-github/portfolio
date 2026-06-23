"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, Lock, Zap, TrendingUp, Network, ShieldCheck,
} from "lucide-react";
import Reveal, { fadeUp, stagger } from "@/components/Reveal";
import CodeBlock from "@/components/CodeBlock";
import ProjectCard from "@/components/ProjectCard";
import AmbientVideo from "@/components/AmbientVideo";

const accentVars = {
  ["--accent" as string]: "#d6a84a",
  ["--accent-soft" as string]: "rgba(214,168,74,0.12)",
  ["--accent-line" as string]: "rgba(214,168,74,0.32)",
};

const specsBar = [
  { k: "Network", v: "Ethereum" },
  { k: "Language", v: "Solidity 0.8.x" },
  { k: "Testing", v: "Foundry + Hardhat" },
  { k: "Library", v: "Ethers.js v6" },
];

const stack = [
  { group: "Contracts", items: ["Solidity", "Hardhat", "Foundry", "OpenZeppelin", "ERC-20", "ERC-721", "Upgradeable"] },
  { group: "Web3 Client", items: ["Ethers.js", "viem", "Wagmi", "RainbowKit", "WalletConnect"] },
  { group: "DeFi", items: ["Uniswap", "Aave", "Chainlink", "Flash Loans", "AMMs"] },
  { group: "Infra", items: ["Polygon", "Arbitrum", "IPFS", "The Graph", "Alchemy"] },
];

const audit = [
  { label: "Reentrancy guards", pct: 100 },
  { label: "Access control", pct: 100 },
  { label: "Test coverage", pct: 95 },
];

const principles = [
  "Reentrancy protection on state changes",
  "Ownable / role-based access control",
  "Upgradeable proxies (UUPS / Transparent)",
  "Unit + fuzz tests, gas snapshots",
  "Packed storage, custom errors",
];

const projects = [
  { title: "DeFi Yield Aggregator", description: "Gas-optimized yield router that rebalances across Aave, Compound, and Yearn to maximize depositor APY.", tags: ["Solidity", "Hardhat", "Ethers.js", "Aave", "Compound"], github: "/", featured: true },
  { title: "NFT Marketplace", description: "Decentralized marketplace with lazy minting, ERC-2981 royalties, auctions, and a React storefront.", tags: ["Solidity", "ERC-721", "ERC-2981", "IPFS", "Wagmi"], github: "/" },
  { title: "Multi-Sig Treasury", description: "Multi-signature wallet for DAO treasuries with proposal voting, time-locks, and on-chain governance.", tags: ["Solidity", "OpenZeppelin", "Foundry"], github: "/" },
  { title: "Token Vesting", description: "Flexible vesting contract with cliffs, linear schedules, and revocability for team distributions.", tags: ["Solidity", "ERC-20", "Hardhat"], github: "/" },
];

const specializations = [
  { icon: TrendingUp, t: "Yield Strategies", d: "AMM routing, auto-compounding, APY optimization." },
  { icon: ShieldCheck, t: "Contract Security", d: "Reentrancy guards, OpenZeppelin patterns, audits." },
  { icon: Zap, t: "Gas Optimization", d: "Packed structs, calldata tricks, custom errors." },
  { icon: Network, t: "Cross-Chain", d: "Polygon, Arbitrum, Optimism, LayerZero bridges." },
];

const blocks = [
  { h: "18,442,901", hash: "0x4a2b…c8d1" },
  { h: "18,442,902", hash: "0x9f3e…7a12" },
  { h: "18,442,903", hash: "0x1b5c…3e9f" },
];

const ledger = [
  { addr: "0x4a2b…c8d1", v: "+2.40 Ξ", state: "confirmed" as const },
  { addr: "0x9f3e…7a12", v: "−0.18 Ξ", state: "confirmed" as const },
  { addr: "0x1b5c…3e9f", v: "+0.96 Ξ", state: "pending" as const },
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

export default function BlockchainPage() {
  return (
    <div className="relative" style={accentVars}>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
        {/* faint ambient video, anchored to the end of the hero */}
        <AmbientVideo
          src="/Blockchain.mp4"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[58%] w-full object-cover opacity-[0.15]"
          style={{
            WebkitMaskImage:
              "linear-gradient(to top, transparent 2%, #000 30%, #000 80%, transparent 100%)",
            maskImage:
              "linear-gradient(to top, transparent 2%, #000 30%, #000 80%, transparent 100%)",
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
                  Thread 02 — Blockchain
                </motion.p>
                <motion.h1 variants={fadeUp} className="font-display text-[clamp(2.6rem,8vw,5.5rem)] text-fg">
                  Trustless
                  <br />
                  <span style={{ color: "var(--accent)" }}>by design.</span>
                </motion.h1>
                <motion.p variants={fadeUp} className="mt-7 max-w-lg text-pretty leading-relaxed text-fg-mute">
                  Production Solidity, DeFi protocols, and decentralized apps on
                  Ethereum and EVM chains. I build for permissionless systems and the
                  open financial rails they unlock.
                </motion.p>
                <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-1.5">
                  {["Ethereum", "Solidity", "DeFi", "Smart Contracts", "Web3"].map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </motion.div>
              </div>

              <motion.div variants={fadeUp} className="hidden lg:block">
                <LedgerVisual />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Specs bar ─────────────────────────────────────── */}
      <Reveal className="border-b border-line">
        <div className="mx-auto grid max-w-shell grid-cols-2 gap-px overflow-hidden wrap-gutter sm:grid-cols-4">
          {specsBar.map((s) => (
            <motion.div key={s.k} variants={fadeUp} className="py-6">
              <div className="eyebrow mb-1.5">{s.k}</div>
              <div className="font-mono text-sm text-fg">{s.v}</div>
            </motion.div>
          ))}
        </div>
      </Reveal>

      {/* ── Stack ─────────────────────────────────────────── */}
      <Reveal className="mx-auto max-w-shell wrap-gutter py-20">
        <motion.h2 variants={fadeUp} className="eyebrow mb-10">Toolkit</motion.h2>
        <div className="grid gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {stack.map((s) => (
            <motion.div key={s.group} variants={fadeUp} className="bg-bg p-6">
              <div className="mb-5 font-mono text-sm" style={{ color: "var(--accent)" }}>{s.group}</div>
              <div className="flex flex-wrap gap-1.5">
                {s.items.map((i) => (
                  <span key={i} className="chip">{i}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Reveal>

      {/* ── Code + audit ──────────────────────────────────── */}
      <Reveal className="mx-auto max-w-shell wrap-gutter py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <motion.div variants={fadeUp}>
            <h2 className="eyebrow mb-5">Smart contracts</h2>
            <p className="font-display text-3xl leading-tight text-fg">
              Every byte costs gas.
            </p>
            <p className="mt-4 leading-relaxed text-fg-mute">
              I write contracts with optimization in mind — immutable variables,
              packed structs, custom errors, and assembly where it earns its keep.
            </p>
            <ul className="mt-7 space-y-3">
              {principles.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm text-fg-mute">
                  <Lock size={13} style={{ color: "var(--accent)" }} className="shrink-0" />
                  {p}
                </li>
              ))}
            </ul>

            <div className="card mt-8 p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="eyebrow">Audit checklist</span>
                <ShieldCheck size={14} style={{ color: "var(--accent)" }} />
              </div>
              {audit.map((row) => (
                <div key={row.label} className="mb-3 last:mb-0">
                  <div className="mb-1.5 flex justify-between font-mono text-xs">
                    <span className="text-fg-mute">{row.label}</span>
                    <span className="text-fg">{row.pct}%</span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-surface">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "var(--accent)" }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${row.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <CodeBlock code={code} filename="SimpleStaking.sol" lang="sol" label="Solidity" maxHeight={460} />
          </motion.div>
        </div>
      </Reveal>

      {/* ── Projects ──────────────────────────────────────── */}
      <Reveal className="mx-auto max-w-shell wrap-gutter py-20">
        <motion.div variants={fadeUp} className="mb-10 flex items-baseline justify-between">
          <h2 className="eyebrow">Selected work</h2>
          <span className="font-mono text-xs text-fg-faint">{projects.length} projects</span>
        </motion.div>
        <div className="grid gap-5 sm:grid-cols-2">
          {projects.map((p, i) => (
            <motion.div key={p.title} variants={fadeUp}>
              <ProjectCard index={i + 1} {...p} />
            </motion.div>
          ))}
        </div>
      </Reveal>

      {/* ── Specializations ───────────────────────────────── */}
      <Reveal className="mx-auto max-w-shell wrap-gutter py-20">
        <motion.h2 variants={fadeUp} className="eyebrow mb-10">DeFi focus</motion.h2>
        <div className="grid gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {specializations.map((s) => {
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

/* ── Ledger / chain visual ────────────────────────────────── */
function LedgerVisual() {
  return (
    <div className="overflow-hidden rounded-[6px] border border-line bg-raised shadow-2xl">
      <div className="flex items-center justify-between border-b border-line bg-surface px-4 py-2.5">
        <span className="font-mono text-[11px] text-fg-mute">ethereum · mainnet</span>
        <span className="flex items-center gap-1.5 font-mono text-[11px]" style={{ color: "var(--accent)" }}>
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-chain2" /> synced
        </span>
      </div>

      <div className="p-5">
        {/* chained blocks */}
        <div className="flex items-stretch">
          {blocks.map((b, i) => (
            <div key={b.h} className="flex items-center">
              <div className="rounded-[4px] border border-line bg-bg px-3 py-2.5">
                <div className="font-mono text-[10px] text-fg-faint">#{b.h}</div>
                <div className="mt-1 font-mono text-[11px]" style={{ color: "var(--accent)" }}>{b.hash}</div>
              </div>
              {i < blocks.length - 1 && <div className="h-px w-4" style={{ background: "var(--accent-line)" }} />}
            </div>
          ))}
        </div>

        {/* ledger rows */}
        <div className="mt-5 space-y-px overflow-hidden rounded-[4px] border border-line bg-line">
          {ledger.map((r) => (
            <div key={r.addr} className="flex items-center justify-between bg-bg px-3 py-2.5">
              <span className="font-mono text-xs text-fg-mute">{r.addr}</span>
              <span className="flex items-center gap-3">
                <span className="font-mono text-xs text-fg">{r.v}</span>
                <span
                  className="rounded-full border px-2 py-0.5 font-mono text-[10px]"
                  style={
                    r.state === "confirmed"
                      ? { color: "var(--chain2)", borderColor: "rgba(95,185,140,0.4)" }
                      : { color: "var(--accent)", borderColor: "var(--accent-line)" }
                  }
                >
                  {r.state}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
