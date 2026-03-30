"use client";

import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Mail,
  Linkedin,
  ArrowRight,
  ChevronDown,
  Globe,
  Blocks,
  BrainCircuit,
  ExternalLink,
} from "lucide-react";

function XTwitterIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.632L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}
import TypewriterText from "@/components/TypewriterText";
import GridBackground from "@/components/GridBackground";
import SkillBadge from "@/components/SkillBadge";

/* ── Animation Variants ───────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7 } },
};

const staggerContainer = (stagger = 0.1, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const slideRight = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Animated Counter ─────────────────────────────────────── */
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 18 });
  const display = useTransform(spring, (v) => Math.round(v).toString() + suffix);

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, motionVal, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

/* ── Data ─────────────────────────────────────────────────── */
const domainCards = [
  {
    href: "/webdev",
    title: "Web Development",
    subtitle: "Full Stack Engineer",
    description:
      "Building scalable web applications with modern frameworks. React, Next.js, Node.js and TypeScript are my daily drivers.",
    icon: Globe,
    accent: "cyan",
    tags: ["Next.js", "React", "TypeScript", "Node.js"],
    gradient: "from-cyan-500/20 to-blue-500/20",
    border: "hover:border-cyan-500/50",
    glow: "hover:shadow-[0_0_40px_rgba(0,245,255,0.12)]",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-500 dark:text-cyan-400",
    lineColor: "via-cyan-400",
    tagBg: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
  },
  {
    href: "/blockchain",
    title: "Blockchain / Web3",
    subtitle: "Ethereum Developer",
    description:
      "Writing smart contracts in Solidity, building DeFi protocols and exploring the decentralized web on Ethereum.",
    icon: Blocks,
    accent: "purple",
    tags: ["Solidity", "Ethereum", "Web3.js", "DeFi"],
    gradient: "from-purple-500/20 to-pink-500/20",
    border: "hover:border-purple-500/50",
    glow: "hover:shadow-[0_0_40px_rgba(157,78,221,0.12)]",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-500 dark:text-purple-400",
    lineColor: "via-purple-400",
    tagBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  },
  {
    href: "/agentic-ai",
    title: "Agentic AI & RAG",
    subtitle: "AI Engineer",
    description:
      "Designing autonomous AI agents and RAG pipelines using LangChain, LangGraph and vector databases.",
    icon: BrainCircuit,
    accent: "green",
    tags: ["LangChain", "RAG", "LangGraph", "OpenAI"],
    gradient: "from-green-500/20 to-teal-500/20",
    border: "hover:border-green-500/50",
    glow: "hover:shadow-[0_0_40px_rgba(0,255,159,0.12)]",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-500 dark:text-green-400",
    lineColor: "via-green-400",
    tagBg: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  },
];

const allSkills = [
  { name: "Ethereum",       variant: "purple" as const },
  { name: "Solidity",       variant: "purple" as const },
  { name: "Web3.js",        variant: "purple" as const },
  { name: "Smart Contracts",variant: "purple" as const },
  { name: "React",          variant: "cyan"   as const },
  { name: "Next.js",        variant: "cyan"   as const },
  { name: "TypeScript",     variant: "cyan"   as const },
  { name: "Node.js",        variant: "cyan"   as const },
  { name: "LangChain",      variant: "green"  as const },
  { name: "RAG Pipelines",  variant: "green"  as const },
  { name: "LangGraph",      variant: "green"  as const },
  { name: "Vector DBs",     variant: "green"  as const },
  { name: "Python",         variant: "orange" as const },
  { name: "FastAPI",        variant: "orange" as const },
  { name: "PostgreSQL",     variant: "orange" as const },
  { name: "Git",            variant: "pink"   as const },
  { name: "Docker",         variant: "pink"   as const },
  { name: "REST APIs",      variant: "pink"   as const },
];

const contacts = [
  {
    icon: Mail,
    label: "Email",
    value: "koustav@example.com",
    href: "mailto:koustav@example.com",
    accent: "cyan",
    desc: "Drop me a message",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "koustavmanna",
    href: "https://linkedin.com/in/koustavmanna",
    accent: "purple",
    desc: "Connect with me",
  },
  {
    icon: XTwitterIcon,
    label: "Twitter / X",
    value: "@koustavmanna",
    href: "https://twitter.com/koustavmanna",
    accent: "green",
    desc: "Follow my work",
  },
];

/* ── Section Wrapper ──────────────────────────────────────── */
function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      variants={staggerContainer(0.12, 0.05)}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ── Page ─────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div className="relative">
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
        {/* Base background */}
        <div className="absolute inset-0 dark:bg-[#090909] bg-gray-50" />

        {/* Aurora orbs */}
        <div
          className="aurora-orb w-[500px] h-[500px] top-[-100px] left-[-150px] dark:bg-cyan-500/10 bg-cyan-400/8"
          style={{ animationDuration: "14s" }}
        />
        <div
          className="aurora-orb-2 w-[400px] h-[400px] bottom-[-80px] right-[-100px] dark:bg-purple-500/10 bg-purple-400/6"
          style={{ animationDuration: "18s" }}
        />
        <div
          className="aurora-orb w-[300px] h-[300px] top-[30%] right-[15%] dark:bg-green-500/8 bg-green-400/5"
          style={{ animationDuration: "10s", animationDelay: "3s" }}
        />

        <GridBackground variant="grid" className="opacity-40 dark:opacity-50" />

        {/* Content */}
        <motion.div
          className="relative z-10 max-w-5xl mx-auto px-6 text-center"
          variants={staggerContainer(0.14, 0)}
          initial="hidden"
          animate="show"
        >
          {/* Status badge */}
          <motion.div variants={fadeUp} className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 font-mono text-xs px-4 py-2 rounded-full border dark:border-green-500/30 border-green-500/40 dark:bg-green-500/8 bg-green-50 dark:text-green-400 text-green-700">
              <span className="w-2 h-2 rounded-full bg-green-400 pulse-ring" />
              Available for opportunities
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl font-medium text-[var(--text-muted)] mb-2 tracking-wide"
          >
            Hi there, I&apos;m
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight mb-5"
          >
            <span className="shimmer-text">Koustav Manna</span>
          </motion.h1>

          {/* Typewriter roles */}
          <motion.div
            variants={fadeUp}
            className="font-mono text-lg sm:text-2xl lg:text-3xl mb-6 h-10 flex items-center justify-center gap-2"
          >
            <span className="text-[var(--text-muted)]">&gt;</span>
            <TypewriterText
              texts={[
                "Blockchain Developer",
                "Full Stack Engineer",
                "AI Engineer",
                "Ethereum Builder",
                "RAG Architect",
              ]}
              className="dark:text-cyan-400 text-cyan-600 font-semibold"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            Mechanical Engineering student at{" "}
            <span className="dark:text-cyan-400 text-cyan-600 font-semibold">
              Jadavpur University
            </span>
            , building at the intersection of blockchain, web, and AI. I write
            smart contracts, ship full-stack apps, and engineer agentic AI systems.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              href="#domains"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold bg-[var(--accent-cyan)] text-[#090909] hover:opacity-90 transition-all duration-300 hover:shadow-[0_0_24px_rgba(0,245,255,0.45)] hover:-translate-y-0.5 shadow-[0_0_12px_rgba(0,245,255,0.2)]"
            >
              Explore My Work
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <a
              href="#reach-out"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold border dark:border-[#1a1a2e] border-gray-300 dark:text-[var(--text-primary)] text-gray-700 hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] dark:hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-0.5"
            >
              Get In Touch
              <ExternalLink size={14} className="opacity-60 group-hover:opacity-100" />
            </a>
          </motion.div>

          {/* Terminal card */}
          <motion.div
            variants={scaleIn}
            className="max-w-md mx-auto text-left"
          >
            <div className="rounded-xl overflow-hidden border dark:border-[#1a1a2e] border-gray-200 dark:bg-[#0d0d1a] bg-white shadow-2xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_20px_rgba(0,245,255,0.05)]">
              <div className="flex items-center gap-2 px-4 py-3 dark:bg-[#1a1a2e] bg-gray-100 border-b dark:border-[#2a2a3e] border-gray-200">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbe2e]" />
                <div className="w-3 h-3 rounded-full bg-[#2ac142]" />
                <span className="font-mono text-xs dark:text-[#546e7a] text-gray-400 ml-2">whoami.sh</span>
              </div>
              <div className="p-5 font-mono text-sm space-y-1.5">
                <div>
                  <span className="dark:text-cyan-400 text-cyan-600">$ </span>
                  <span className="dark:text-gray-300 text-gray-700">cat profile.json</span>
                </div>
                <div className="pl-2 space-y-1">
                  <div><span className="dark:text-purple-400 text-purple-600">&quot;name&quot;</span><span className="text-[var(--text-muted)]">: </span><span className="dark:text-green-400 text-green-600">&quot;Koustav Manna&quot;</span><span className="text-[var(--text-muted)]">,</span></div>
                  <div><span className="dark:text-purple-400 text-purple-600">&quot;university&quot;</span><span className="text-[var(--text-muted)]">: </span><span className="dark:text-green-400 text-green-600">&quot;Jadavpur University&quot;</span><span className="text-[var(--text-muted)]">,</span></div>
                  <div><span className="dark:text-purple-400 text-purple-600">&quot;branch&quot;</span><span className="text-[var(--text-muted)]">: </span><span className="dark:text-yellow-400 text-yellow-600">&quot;Mechanical Engineering&quot;</span><span className="text-[var(--text-muted)]">,</span></div>
                  <div><span className="dark:text-purple-400 text-purple-600">&quot;focus&quot;</span><span className="text-[var(--text-muted)]">: </span><span className="dark:text-cyan-400 text-cyan-600">[&quot;Blockchain&quot;, &quot;Web Dev&quot;, &quot;AI&quot;]</span><span className="text-[var(--text-muted)]">,</span></div>
                  <div><span className="dark:text-purple-400 text-purple-600">&quot;status&quot;</span><span className="text-[var(--text-muted)]">: </span><span className="dark:text-green-400 text-green-600">&quot;building cool things 🚀&quot;</span></div>
                </div>
                <div className="flex items-center gap-1 pt-1">
                  <span className="dark:text-cyan-400 text-cyan-600">$ </span>
                  <span className="inline-block w-2 h-4 bg-cyan-400 dark:bg-cyan-400 animate-[blink_1s_step-end_infinite]" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[var(--text-muted)]"
        >
          <span className="font-mono text-xs tracking-widest uppercase opacity-60">scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── About ──────────────────────────────────────────── */}
      <Section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 dark:bg-[#0a0a0f] bg-white" />
        <GridBackground variant="dots" className="opacity-30" />
        {/* Decorative blur blob */}
        <div className="absolute right-0 top-0 w-96 h-96 dark:bg-purple-500/5 bg-purple-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Text */}
            <motion.div variants={slideRight}>
              <motion.div variants={fadeUp} className="font-mono text-sm text-[var(--accent-cyan)] mb-3 flex items-center gap-2">
                <span className="text-[var(--text-muted)]">// </span>about_me
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
                Building at the{" "}
                <span className="gradient-text-cyan">intersection</span> of technology
              </motion.h2>
              <motion.div variants={staggerContainer(0.1)} className="space-y-4 text-[var(--text-secondary)] leading-relaxed font-light">
                {[
                  <>I&apos;m a Mechanical Engineering student at <strong className="dark:text-cyan-400 text-cyan-600 font-semibold">Jadavpur University</strong>, but my passion lies in software — specifically at the cutting edge of blockchain, web development, and artificial intelligence.</>,
                  <>I build smart contracts on <strong className="dark:text-purple-400 text-purple-600 font-semibold">Ethereum</strong>, ship production-grade web apps with <strong className="dark:text-cyan-400 text-cyan-600 font-semibold">Next.js</strong>, and architect agentic AI systems using <strong className="dark:text-green-400 text-green-600 font-semibold">LangChain &amp; RAG pipelines</strong>.</>,
                  <>My interdisciplinary background gives me a unique problem-solving lens — I approach software challenges with systems thinking and first-principles reasoning.</>,
                ].map((text, i) => (
                  <motion.p key={i} variants={fadeUp}>{text}</motion.p>
                ))}
              </motion.div>
            </motion.div>

            {/* Stats panel */}
            <motion.div variants={fadeUp} className="space-y-4">
              {/* Terminal stats card */}
              <div className="rounded-xl overflow-hidden border dark:border-[#1a1a2e] border-gray-200 dark:bg-[#0d0d1a] bg-gray-50 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-2 px-4 py-3 dark:bg-[#1a1a2e] bg-gray-100 border-b dark:border-[#2a2a3e] border-gray-200">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbe2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#2ac142]" />
                  <span className="font-mono text-xs dark:text-[#546e7a] text-gray-400 ml-2">stats.sh</span>
                </div>
                <div className="p-5 font-mono text-sm space-y-3">
                  {[
                    { label: "University", value: "Jadavpur University", color: "dark:text-cyan-400 text-cyan-600" },
                    { label: "Branch",     value: "Mechanical Engineering", color: "dark:text-green-400 text-green-600" },
                    { label: "Focus",      value: "3 domains",            color: "dark:text-purple-400 text-purple-600" },
                    { label: "Status",     value: "open to work ✓",       color: "dark:text-yellow-400 text-yellow-600" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <span className="dark:text-cyan-400 text-cyan-600 select-none">▸</span>
                      <span className="dark:text-gray-500 text-gray-400 w-28 shrink-0">{item.label}</span>
                      <span className={`font-semibold ${item.color}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stat numbers */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 3,  suffix: "",  label: "Domains",  color: "dark:text-cyan-400 text-cyan-600",   glow: "dark:border-cyan-500/20" },
                  { value: 10, suffix: "+", label: "Projects", color: "dark:text-green-400 text-green-600", glow: "dark:border-green-500/20" },
                  { value: 18, suffix: "+", label: "Skills",   color: "dark:text-purple-400 text-purple-600", glow: "dark:border-purple-500/20" },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={scaleIn}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    className={`rounded-xl border ${stat.glow} border-gray-200 dark:bg-[#0f0f1a] bg-white p-4 text-center shadow-sm`}
                  >
                    <div className={`font-mono text-2xl font-black mb-1 ${stat.color}`}>
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="font-mono text-xs dark:text-gray-500 text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ── Skills ─────────────────────────────────────────── */}
      <Section className="relative py-28">
        <div className="absolute inset-0 dark:bg-[#090909] bg-gray-50" />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <div className="font-mono text-sm text-[var(--accent-cyan)] mb-3 flex items-center justify-center gap-2">
              <span className="text-[var(--text-muted)]">// </span>tech_stack
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
              Skills &amp; Technologies
            </h2>
            <p className="text-[var(--text-secondary)] mt-3 font-light">
              The tools and technologies I work with every day
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.05)}
            className="flex flex-wrap gap-3 justify-center"
          >
            {allSkills.map((skill) => (
              <motion.div key={skill.name} variants={scaleIn}>
                <SkillBadge name={skill.name} variant={skill.variant} size="lg" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── Domains ────────────────────────────────────────── */}
      <Section id="domains" className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 dark:bg-[#0a0a0f] bg-white" />
        <GridBackground variant="grid" className="opacity-25 dark:opacity-35" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] dark:bg-cyan-500/4 bg-cyan-400/3 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <div className="font-mono text-sm text-[var(--accent-cyan)] mb-3 flex items-center justify-center gap-2">
              <span className="text-[var(--text-muted)]">// </span>domains
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
              What I Build
            </h2>
            <p className="text-[var(--text-secondary)] mt-3 max-w-xl mx-auto font-light">
              Three distinct domains, one unified vision: building at the edge of what&apos;s possible.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.15)}
            className="grid md:grid-cols-3 gap-6"
          >
            {domainCards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div key={card.href} variants={fadeUp}>
                  <Link
                    href={card.href}
                    className={`group relative flex flex-col rounded-2xl border dark:border-[#1a1a2e] border-gray-200 dark:bg-[#0f0f1a] bg-white p-6 transition-all duration-300 hover:-translate-y-2 ${card.border} ${card.glow} overflow-hidden h-full`}
                  >
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-400`} />
                    {/* Top accent line */}
                    <div className={`absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent ${card.lineColor} to-transparent`} />

                    <div className="relative z-10 flex flex-col h-full">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center mb-5 border ${
                        card.accent === "cyan" ? "border-cyan-500/20" : card.accent === "purple" ? "border-purple-500/20" : "border-green-500/20"
                      } transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_16px_rgba(0,245,255,0.2)]`}>
                        <Icon size={22} className={card.iconColor} />
                      </div>

                      <div className={`font-mono text-xs mb-1 font-medium ${card.iconColor}`}>{card.subtitle}</div>
                      <h3 className="font-bold text-lg text-[var(--text-primary)] mb-3">{card.title}</h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 font-light flex-1">
                        {card.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {card.tags.map((tag) => (
                          <span key={tag} className={`font-mono text-xs px-2 py-0.5 rounded-md border ${card.tagBg}`}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className={`flex items-center gap-1.5 font-semibold text-sm ${card.iconColor} group-hover:gap-2.5 transition-all duration-300`}>
                        Explore
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Section>

      {/* ── Reach Out ──────────────────────────────────────── */}
      <Section id="reach-out" className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 dark:bg-[#090909] bg-gray-50" />
        {/* Background orbs */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 dark:bg-cyan-500/6 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 dark:bg-purple-500/6 bg-purple-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div variants={fadeUp}>
            <div className="font-mono text-sm text-[var(--accent-cyan)] mb-3 flex items-center justify-center gap-2">
              <span className="text-[var(--text-muted)]">// </span>reach_out
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[var(--text-primary)]">
              Let&apos;s Build Together
            </h2>
            <p className="text-[var(--text-secondary)] max-w-lg mx-auto mb-14 leading-relaxed font-light">
              Whether it&apos;s a blockchain project, a web app, or an AI system —
              I&apos;m always open to interesting collaborations and opportunities.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.12)}
            className="grid sm:grid-cols-3 gap-4"
          >
            {contacts.map((c) => {
              const Icon = c.icon;
              const accentClasses = {
                cyan:   { hover: "hover:border-cyan-500/40 hover:shadow-[0_0_24px_rgba(0,245,255,0.1)]", icon: "bg-cyan-500/10 border-cyan-500/20 text-cyan-500 dark:text-cyan-400", text: "dark:text-cyan-400 text-cyan-600" },
                purple: { hover: "hover:border-purple-500/40 hover:shadow-[0_0_24px_rgba(157,78,221,0.1)]", icon: "bg-purple-500/10 border-purple-500/20 text-purple-500 dark:text-purple-400", text: "dark:text-purple-400 text-purple-600" },
                green:  { hover: "hover:border-green-500/40 hover:shadow-[0_0_24px_rgba(0,255,159,0.1)]", icon: "bg-green-500/10 border-green-500/20 text-green-500 dark:text-green-400", text: "dark:text-green-400 text-green-600" },
              }[c.accent]!;

              return (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  variants={scaleIn}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className={`group rounded-2xl border dark:border-[#1a1a2e] border-gray-200 dark:bg-[#0f0f1a] bg-white p-6 text-left transition-all duration-300 ${accentClasses.hover} block`}
                >
                  <div className={`w-10 h-10 rounded-lg mb-4 flex items-center justify-center border transition-all duration-300 group-hover:scale-110 ${accentClasses.icon}`}>
                    <Icon size={18} />
                  </div>
                  <div className="font-mono text-xs dark:text-gray-500 text-gray-400 mb-1">{c.desc}</div>
                  <div className="font-semibold text-sm text-[var(--text-primary)] mb-1">{c.label}</div>
                  <div className={`font-mono text-xs truncate ${accentClasses.text}`}>{c.value}</div>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
