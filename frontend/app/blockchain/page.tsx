"use client";

import { useRef } from "react";
import {
  Blocks, ArrowLeft, Shield, Code2, Link2, Layers,
  Zap, Lock, TrendingUp, Network,
} from "lucide-react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
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

function FadeSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      variants={stagger(0.12)}
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
  { category: "Smart Contracts", color: "purple" as const, items: ["Solidity", "Hardhat", "Foundry", "OpenZeppelin", "ERC-20", "ERC-721", "ERC-1155", "Upgradeable Contracts"] },
  { category: "Web3 Frontend",   color: "cyan"   as const, items: ["Ethers.js", "Web3.js", "Wagmi", "RainbowKit", "MetaMask SDK", "viem", "WalletConnect"] },
  { category: "DeFi & Protocols",color: "green"  as const, items: ["Uniswap", "Aave", "Chainlink Oracles", "Flash Loans", "Yield Farming", "Liquidity Pools", "AMMs"] },
  { category: "Infrastructure",  color: "orange" as const, items: ["Ethereum Mainnet", "Polygon", "Arbitrum", "IPFS", "The Graph", "Alchemy", "Infura", "Tenderly"] },
];

const projects = [
  { title: "DeFi Yield Aggregator", description: "A gas-optimized yield farming aggregator that automatically rebalances positions across Aave, Compound, and Yearn to maximize APY for depositors.", tags: ["Solidity", "Hardhat", "Ethers.js", "React", "Aave", "Compound"], accent: "purple" as const, github: "https://github.com/koustavmanna", featured: true },
  { title: "NFT Marketplace", description: "A decentralized NFT marketplace with lazy minting, royalty enforcement via ERC-2981, auction mechanics, and a React storefront.", tags: ["Solidity", "ERC-721", "ERC-2981", "Next.js", "IPFS", "Wagmi"], accent: "cyan" as const, github: "https://github.com/koustavmanna" },
  { title: "Multi-Sig Treasury", description: "A multi-signature wallet for DAO treasury management with proposal voting, time-locks, and on-chain governance. Inspired by Gnosis Safe.", tags: ["Solidity", "OpenZeppelin", "Foundry", "TypeScript"], accent: "green" as const, github: "https://github.com/koustavmanna" },
  { title: "Token Vesting Contract", description: "A flexible token vesting contract with cliff periods, linear vesting schedules, and revocability — used for team token distributions.", tags: ["Solidity", "ERC-20", "Hardhat", "Ethers.js"], accent: "purple" as const, github: "https://github.com/koustavmanna" },
];

const contractPrinciples = [
  "Reentrancy protection on all state changes",
  "Access control patterns (Ownable, Roles)",
  "Upgradeable proxies (UUPS / Transparent)",
  "Comprehensive unit + fuzz tests",
  "Gas optimization with packed storage",
  "Formal verification ready",
];

const soliditySnippet = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title SimpleStaking - Stake tokens, earn rewards
/// @author Koustav Manna
contract SimpleStaking is ReentrancyGuard, Ownable {
    IERC20 public immutable stakingToken;
    uint256 public rewardRate = 100; // tokens per block

    mapping(address => uint256) public stakedBalance;
    mapping(address => uint256) public lastClaimBlock;

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 reward);

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

    function _claimRewards() internal {
        uint256 reward = pendingRewards(msg.sender);
        lastClaimBlock[msg.sender] = block.number;
        if (reward > 0) {
            emit RewardClaimed(msg.sender, reward);
        }
    }
}`;

/* ── Ethereum Hex ─────────────────────────────────────────── */
function EthHex({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <polygon points="20,2 36,11 36,29 20,38 4,29 4,11" className="dark:fill-purple-500/10 fill-purple-100 dark:stroke-purple-500/30 stroke-purple-300" strokeWidth="1" />
      <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" className="dark:fill-purple-400 fill-purple-600" style={{ fontSize: 14, fontWeight: 700, fontFamily: "monospace" }}>Ξ</text>
    </svg>
  );
}

/* ── Page ──────────────────────────────────────────────────── */
export default function BlockchainPage() {
  return (
    <div className="relative min-h-screen">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 dark:bg-[#090909] bg-gray-50" />
        {/* Aurora orbs — purple theme */}
        <div className="absolute top-[-80px] right-[-100px] w-[550px] h-[550px] rounded-full dark:bg-purple-500/8 bg-purple-400/6 blur-3xl pointer-events-none" style={{ animation: "auroraMove 16s ease-in-out infinite" }} />
        <div className="absolute bottom-0 left-[-60px] w-[350px] h-[350px] rounded-full dark:bg-pink-500/5 bg-pink-400/4 blur-3xl pointer-events-none" style={{ animation: "auroraMove 12s ease-in-out infinite reverse" }} />
        <GridBackground variant="dots" className="opacity-35" />

        <motion.div
          className="relative z-10 max-w-5xl mx-auto px-6"
          variants={stagger(0.1, 0)}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp}>
            <Link href="/" className="inline-flex items-center gap-2 font-mono text-sm dark:text-gray-500 text-gray-400 hover:text-[var(--accent-cyan)] transition-colors duration-300 mb-10 group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
              cd ~/home
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1 rounded-full dark:bg-purple-500/10 bg-purple-50 dark:border dark:border-purple-500/20 border border-purple-500/30 dark:text-purple-400 text-purple-600">
              <Blocks size={11} /> domain_02 / blockchain-web3
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div variants={fadeUp} className="flex items-center gap-4 mb-5">
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Blocks size={30} className="dark:text-purple-400 text-purple-600" />
                </motion.div>
                <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                  <span className="dark:text-white text-gray-900">Block</span>
                  <span className="dark:text-purple-400 text-purple-600">chain</span>
                </h1>
              </motion.div>

              <motion.p variants={fadeUp} className="text-base text-[var(--text-secondary)] leading-relaxed mb-8 font-light max-w-lg">
                Writing production Solidity, building DeFi protocols, and creating decentralized applications on{" "}
                <span className="dark:text-purple-400 text-purple-600 font-semibold">Ethereum</span> and EVM-compatible chains. I believe in permissionless, trustless systems and the open financial future they enable.
              </motion.p>

              <motion.div variants={stagger(0.06)} className="flex flex-wrap gap-2">
                {["Ethereum", "Solidity", "DeFi", "NFTs", "Smart Contracts", "Web3"].map((tag) => (
                  <motion.span key={tag} variants={scaleIn} className="font-mono text-xs px-3 py-1.5 rounded-lg border dark:border-purple-500/20 border-purple-500/30 dark:bg-purple-500/10 bg-purple-50 dark:text-purple-400 text-purple-600">
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Hero visual — blockchain node visual */}
            <motion.div
              variants={fadeLeft}
              className="hidden lg:block relative"
              style={{ animation: "floatY 8s ease-in-out infinite 1s" }}
            >
              <div className="rounded-2xl overflow-hidden border dark:border-[#1a1a2e] border-gray-200 dark:bg-[#0d0d1a] bg-white p-6 shadow-2xl dark:shadow-[0_30px_80px_rgba(0,0,0,0.7),0_0_30px_rgba(157,78,221,0.05)]">
                <div className="font-mono text-xs dark:text-purple-400 text-purple-600 mb-4 flex items-center gap-2">
                  <Network size={12} /> ethereum_network
                </div>
                {/* Fake blockchain viz */}
                <div className="flex items-center gap-2 mb-3">
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="flex items-center gap-2">
                      <div className="w-12 h-12 rounded-xl dark:bg-purple-500/10 bg-purple-50 border dark:border-purple-500/20 border-purple-200 flex items-center justify-center shrink-0">
                        <EthHex size={28} />
                      </div>
                      {n < 4 && <div className="h-px w-4 dark:bg-purple-500/30 bg-purple-200" />}
                    </div>
                  ))}
                </div>
                <div className="space-y-2 mt-4">
                  {["0x4a2b...c8d1", "0x9f3e...7a12", "0x1b5c...3e9f"].map((addr, i) => (
                    <div key={addr} className="flex items-center justify-between text-xs font-mono">
                      <span className="dark:text-gray-500 text-gray-400">{addr}</span>
                      <span className={`px-2 py-0.5 rounded-full ${i === 0 ? "dark:bg-green-500/20 dark:text-green-400 text-green-600 bg-green-50" : "dark:bg-purple-500/20 dark:text-purple-400 text-purple-600 bg-purple-50"}`}>
                        {i === 0 ? "✓ confirmed" : "pending"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Gas badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 px-3 py-2 rounded-xl dark:bg-[#0f0f1a] bg-white border dark:border-purple-500/30 border-purple-200 shadow-lg"
              >
                <div className="font-mono text-xs dark:text-purple-400 text-purple-600 flex items-center gap-1.5">
                  <Zap size={10} /> Gas: 21,000 gwei
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────── */}
      <FadeSection className="relative py-8 border-y dark:border-[#1a1a2e] border-gray-200">
        <div className="absolute inset-0 dark:bg-[#0f0f1a] bg-purple-50/40" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.div variants={stagger(0.1)} className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { label: "Network",   value: "Ethereum",      icon: Layers },
              { label: "Language",  value: "Solidity 0.8.x",icon: Code2 },
              { label: "Testing",   value: "Foundry + HH",  icon: Shield },
              { label: "Web3 Lib",  value: "Ethers.js v6",  icon: Link2 },
            ].map(({ label, value, icon: Icon }) => (
              <motion.div key={label} variants={fadeUp} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center dark:text-purple-400 text-purple-600 shrink-0">
                  <Icon size={15} />
                </div>
                <div>
                  <div className="font-mono text-xs dark:text-gray-500 text-gray-400">{label}</div>
                  <div className="font-semibold text-sm dark:text-gray-200 text-gray-700">{value}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </FadeSection>

      {/* ── Skills ─────────────────────────────────────────── */}
      <FadeSection className="relative py-24">
        <div className="absolute inset-0 dark:bg-[#0a0a0f] bg-white" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.div variants={fadeUp} className="mb-12">
            <div className="font-mono text-sm dark:text-purple-400 text-purple-600 mb-2 flex items-center gap-2">
              <span className="dark:text-gray-500 text-gray-400">// </span>web3_stack
            </div>
            <h2 className="text-3xl font-bold text-[var(--text-primary)]">Blockchain Toolkit</h2>
          </motion.div>

          <motion.div variants={stagger(0.1)} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {skills.map((group) => (
              <motion.div
                key={group.category}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-xl border dark:border-[#1a1a2e] border-gray-200 dark:bg-[#0f0f1a] bg-gray-50 p-5 transition-all duration-300"
              >
                <div className={`font-mono text-sm font-semibold mb-4 ${
                  group.color === "purple" ? "dark:text-purple-400 text-purple-600"
                  : group.color === "cyan"   ? "dark:text-cyan-400 text-cyan-600"
                  : group.color === "green"  ? "dark:text-green-400 text-green-600"
                  : "dark:text-orange-400 text-orange-600"
                }`}>
                  {group.category}
                </div>
                <motion.div variants={stagger(0.04)} className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <motion.div key={item} variants={scaleIn}>
                      <SkillBadge name={item} variant={group.color} size="sm" />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </FadeSection>

      {/* ── Code + Principles ──────────────────────────────── */}
      <FadeSection className="relative py-24">
        <div className="absolute inset-0 dark:bg-[#090909] bg-gray-50" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 dark:bg-purple-500/5 bg-purple-400/4 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 items-start">

            {/* Left */}
            <motion.div variants={fadeRight} className="lg:col-span-2 flex flex-col justify-center">
              <div className="font-mono text-sm dark:text-purple-400 text-purple-600 mb-2 flex items-center gap-2">
                <span className="dark:text-gray-500 text-gray-400">// </span>solidity_code
              </div>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4 leading-tight">
                Gas-Optimized <span className="dark:text-purple-400 text-purple-600">Smart Contracts</span>
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-8 font-light text-sm">
                Every byte costs gas on Ethereum. I write contracts with optimization in mind — using immutable variables, packed structs, custom errors, and assembly where it counts.
              </p>
              <motion.ul variants={stagger(0.08)} className="space-y-3">
                {contractPrinciples.map((item) => (
                  <motion.li key={item} variants={fadeUp} className="flex items-center gap-3 group">
                    <div className="w-6 h-6 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 group-hover:bg-purple-500/20 transition-colors duration-200">
                      <Lock size={11} className="dark:text-purple-400 text-purple-600" />
                    </div>
                    <span className="text-sm text-[var(--text-secondary)] font-light">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Security score card */}
              <motion.div variants={fadeUp} className="mt-8 p-4 rounded-xl border dark:border-[#1a1a2e] border-gray-200 dark:bg-[#0f0f1a] bg-white">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs dark:text-gray-400 text-gray-500">Audit Checklist</span>
                  <TrendingUp size={13} className="dark:text-green-400 text-green-600" />
                </div>
                {[
                  { label: "Reentrancy Guards", pct: 100 },
                  { label: "Access Control",    pct: 100 },
                  { label: "Test Coverage",     pct: 95  },
                ].map((row) => (
                  <div key={row.label} className="mb-2">
                    <div className="flex justify-between font-mono text-xs mb-1">
                      <span className="dark:text-gray-500 text-gray-400">{row.label}</span>
                      <span className="dark:text-green-400 text-green-600">{row.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full dark:bg-gray-800 bg-gray-200 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-green-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${row.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — code */}
            <motion.div variants={fadeLeft} className="lg:col-span-3">
              <div className="rounded-xl overflow-hidden border dark:border-[#1a1a2e] border-gray-200 shadow-2xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                <div className="flex items-center gap-2 px-4 py-3 dark:bg-[#1a1a2e] bg-gray-100 border-b dark:border-[#2a2a3e] border-gray-200">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbe2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#2ac142]" />
                  <span className="font-mono text-xs dark:text-[#546e7a] text-gray-400 ml-2">SimpleStaking.sol</span>
                  <span className="ml-auto font-mono text-xs px-2 py-0.5 rounded dark:bg-purple-500/20 bg-purple-100 dark:text-purple-400 text-purple-600">Solidity</span>
                </div>
                <div className="dark:bg-[#0d0d1a] bg-[#fafafa] p-5 overflow-x-auto max-h-96 overflow-y-auto">
                  <pre className="font-mono text-xs leading-relaxed">
                    {soliditySnippet.split("\n").map((line, i) => {
                      const h = line
                        .replace(/(\/\/.*)/g, '<span class="syntax-comment">$1</span>')
                        .replace(/\b(pragma|solidity|import|contract|function|mapping|event|constructor|emit|require|returns|return|external|public|view|internal|uint256|address|bool|string|bytes32|memory|storage|immutable|indexed)\b/g, '<span class="syntax-keyword">$1</span>')
                        .replace(/("(?:[^"\\]|\\.)*")/g, '<span class="syntax-string">$1</span>')
                        .replace(/\b(\d+)\b/g, '<span class="syntax-number">$1</span>')
                        .replace(/\b(IERC20|ReentrancyGuard|Ownable|SimpleStaking)\b/g, '<span class="syntax-type">$1</span>');
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
      <FadeSection className="relative py-24">
        <div className="absolute inset-0 dark:bg-[#0a0a0f] bg-white" />
        <GridBackground variant="grid" className="opacity-20 dark:opacity-30" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.div variants={fadeUp} className="flex items-end justify-between mb-12">
            <div>
              <div className="font-mono text-sm dark:text-purple-400 text-purple-600 mb-2 flex items-center gap-2">
                <span className="dark:text-gray-500 text-gray-400">// </span>projects
              </div>
              <h2 className="text-3xl font-bold text-[var(--text-primary)]">Blockchain Projects</h2>
            </div>
            <span className="font-mono text-xs dark:text-gray-600 text-gray-400 hidden sm:block">{projects.length} projects</span>
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

      {/* ── DeFi Concepts ──────────────────────────────────── */}
      <FadeSection className="relative py-24">
        <div className="absolute inset-0 dark:bg-[#090909] bg-gray-50" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <div className="font-mono text-sm dark:text-purple-400 text-purple-600 mb-2 flex items-center justify-center gap-2">
              <span className="dark:text-gray-500 text-gray-400">// </span>defi_expertise
            </div>
            <h2 className="text-3xl font-bold text-[var(--text-primary)]">DeFi Specializations</h2>
          </motion.div>

          <motion.div variants={stagger(0.1)} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: TrendingUp, title: "Yield Farming",     desc: "AMM routing, auto-compounding strategies, APY optimization", color: "purple" },
              { icon: Lock,       title: "Smart Security",    desc: "Reentrancy guards, formal verification, OpenZeppelin patterns", color: "green" },
              { icon: Zap,        title: "Gas Optimization",  desc: "Packed structs, calldata tricks, custom errors, assembly", color: "cyan" },
              { icon: Network,    title: "Cross-Chain",       desc: "Polygon, Arbitrum, Optimism, LayerZero bridges", color: "orange" },
            ].map(({ icon: Icon, title, desc, color }) => (
              <motion.div
                key={title}
                variants={scaleIn}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-xl border dark:border-[#1a1a2e] border-gray-200 dark:bg-[#0f0f1a] bg-white p-5"
              >
                <div className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center border ${
                  color === "purple" ? "bg-purple-500/10 border-purple-500/20 dark:text-purple-400 text-purple-600"
                  : color === "green"  ? "bg-green-500/10 border-green-500/20 dark:text-green-400 text-green-600"
                  : color === "cyan"   ? "bg-cyan-500/10 border-cyan-500/20 dark:text-cyan-400 text-cyan-600"
                  : "bg-orange-500/10 border-orange-500/20 dark:text-orange-400 text-orange-600"
                }`}>
                  <Icon size={16} />
                </div>
                <div className="font-semibold text-sm text-[var(--text-primary)] mb-2">{title}</div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed font-light">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </FadeSection>
    </div>
  );
}
