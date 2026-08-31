"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Mail, Linkedin, GitPullRequest, Star, Github } from "lucide-react";
import Reveal, { fadeUp, stagger } from "@/components/Reveal";
import FlipText from "@/components/FlipText";
import StackCard from "@/components/StackCard";
import ParallaxPortrait from "@/components/ParallaxPortrait";
import WorkspaceBackdrop from "@/components/WorkspaceBackdrop";

function XIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.632L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

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
    href: "/ai-ml",
    name: "AI / ML",
    accent: "var(--ai)",
    blurb: "Machine learning and deep learning end to end — training neural nets, fine-tuning transformers, RAG and agents.",
    stack: ["PyTorch", "Deep Learning", "LLMs", "RAG", "Hugging Face"],
  },
  {
    idx: "03",
    href: "/others",
    name: "Others",
    accent: "var(--chain)",
    blurb: "The infrastructure corners — scalable system design, low-latency / HFT systems, and the MLOps that carries models to production.",
    stack: ["System Design", "HFT", "C++", "MLOps", "Distributed"],
  },
];

const meta = [
  { k: "Role", v: "Software Developer"},
  { k: "Focus", v: "Web · AI/ML · Systems" },
  { k: "Based", v: "Jadavpur University, KOL, IN" },
];

const stackGroups = [
  { label: "WebDev", color: "var(--web)", items: ["Next.js", "React", "TypeScript", "Node", "FastAPI", "Tailwind", "PostgreSQL", "Prisma"] },
  { label: "AI / ML", color: "var(--ai)", items: ["PyTorch", "TensorFlow", "scikit-learn", "Hugging Face", "LangChain", "LangGraph", "RAG", "pandas"] },
  { label: "Others", color: "var(--chain)", items: ["C++", "MLflow", "Kubernetes", "System Design", "Kafka", "Redis", "gRPC", "Docker"] },
];

const experience = [
  {
    idx: "01",
    repo: "mlflow/mlflow",
    what: "ML lifecycle platform",
    stars: "27.7k",
    pr: "#25135",
    merged: "Aug 2026",
    accent: "var(--ai)",
    title: "Fixed a late-binding closure that configured the wrong autolog flavor",
    blurb:
      "Deferred post-import hooks closed over the loop variable by reference, so every lazily-imported flavor configured the last one — importing LangChain during evaluation silently enabled Bedrock instead, and its tracing never started. Bound per-iteration and restored teardown hooks from the correct dict.",
    diff: "+201 / −6",
    tags: ["Python", "Autologging", "Tracing"],
    href: "https://github.com/mlflow/mlflow/pull/25135",
  },
  {
    idx: "02",
    repo: "confident-ai/deepeval",
    what: "LLM evaluation framework",
    stars: "18.0k",
    pr: "#3049",
    merged: "Aug 2026",
    accent: "var(--chain2)",
    title: "Aligned CSV context delimiters with the writer deepeval ships",
    blurb:
      "save_as(\"csv\") joined context on `|` while the loader split on `;`, so a dataset deepeval wrote and read back collapsed into one bogus chunk — no exception, and every RAG metric downstream scored against it. Fixed the default, the docs, and added the round-trip regression test.",
    diff: "+34 / −6",
    tags: ["Python", "Datasets", "RAG evals"],
    href: "https://github.com/confident-ai/deepeval/pull/3049",
  },
  {
    idx: "03",
    repo: "DLR-RM/stable-baselines3",
    what: "RL algorithms in PyTorch",
    stars: "13.7k",
    pr: "#2275",
    merged: "Aug 2026",
    accent: "var(--web)",
    title: "Stopped n_steps being silently ignored with a custom replay buffer",
    blurb:
      "n-step validation lived inside the default-buffer branch, so passing replay_buffer_class dropped n-step returns without a word — the exact configuration the HER docs recommend. Moved the check out, made it accept subclasses, and forwarded n_steps/gamma properly.",
    diff: "+100 / −14",
    tags: ["Python", "RL", "Replay buffers"],
    href: "https://github.com/DLR-RM/stable-baselines3/pull/2275",
  },
];

const contacts = [
  { label: "GitHub", value: "Koustav Manna", href: "https://www.github.com/Koustav-github", icon: Github },
  { label: "Email", value: "koustav.2005.manna@gmail.com", href: "mailto:koustav.2005.manna@gmail.com", icon: Mail },
  { label: "LinkedIn", value: "Koustav Manna", href: "https://www.linkedin.com/in/koustav-manna-b6a64330b/", icon: Linkedin },
  { label: "X", value: "Koustav Manna", href: "https://x.com/KoustavMan51112", icon: XIcon },
];

/* ── Page ─────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div className="relative">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <WorkspaceBackdrop />
        <div className="relative z-10 mx-auto max-w-shell wrap-gutter pb-20 pt-36 sm:pt-44">
          <motion.div variants={stagger(0.09, 0.05)} initial="hidden" animate="show">
            <motion.p variants={fadeUp} className="eyebrow mb-7 flex items-center gap-2">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-chain2" />
              Open to work · Software Developer
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
                Full-Stack WebDev
              </Link>
              ,{" "}
              <Link href="/ai-ml" className="text-fg underline decoration-ai decoration-2 underline-offset-4 transition-colors hover:text-ai">
                AI &amp; Machine Learning
              </Link>
              , and{" "}
              <Link href="/others" className="text-fg underline decoration-chain decoration-2 underline-offset-4 transition-colors hover:text-chain">
                System Design
              </Link>
              .
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-3">
              <a href="#index" className="btn btn-solid">
                <FlipText label="Browse the work" light="#0a0a0b" />
                <ArrowRight size={15} />
              </a>
              <a href="#contact" className="btn btn-ghost">
                <FlipText label="Get in touch" light="var(--fg)" />
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


      {/* ── About (faint parallax portrait) ───────────────── */}
      <section className="relative overflow-hidden border-y border-line">
        <ParallaxPortrait src="/avatar.webp" opacity={0.14} align="left" />
        <Reveal as="div" className="relative z-10 mx-auto max-w-shell wrap-gutter py-24 sm:py-28">
          <motion.div variants={fadeUp} className="ml-auto max-w-xl">
            <h2 className="eyebrow mb-6">About</h2>
            <p className="font-display text-2xl leading-tight text-fg sm:text-3xl">
              An Undergrad who builds software. Working where
              the Web Development and AI overlap.
            </p>
            <div className="mt-6 space-y-4 text-pretty leading-relaxed text-fg-mute">
              <p>
                I&apos;m a Junior at Jadavpur University, my
                work lives in code. I write, ship
                production web apps with Next.js and FastAPI, and design Agentic AI systems with
                LangGraph and RAG and Design System Architecture.
              </p>
              <p>
                The Engineering background is the through-line: I approach problems
                with systems thinking and reason from first principles, whether the
                target is a gas-optimized contract or a retrieval pipeline.
              </p>
            </div>

            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5">
              {[
                { n: "3", l: "Disciplines" },
                { n: "3", l: "OSS Merged" },
                { n: "10+", l: "Projects" },
                { n: "18+", l: "Tools" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="font-display text-3xl text-fg">{s.n}</dt>
                  <dd className="eyebrow mt-1.5">{s.l}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </Reveal>
      </section>

      {/* ── Work experience (open source) ─────────────────── */}
      <Reveal id="work" className="mx-auto max-w-shell wrap-gutter py-20">
        <motion.div variants={fadeUp} className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="eyebrow mb-6">Work Experience — Open Source</h2>
            <p className="font-display text-3xl leading-tight text-fg sm:text-4xl">
              Patches merged into the tools
              <br />
              I build on.
            </p>
          </div>
          <dl className="flex gap-x-10 gap-y-5">
            {[
              { n: "3", l: "Merged PRs" },
              { n: "59k+", l: "Stars combined" },
            ].map((s) => (
              <div key={s.l}>
                <dt className="font-display text-3xl text-fg">{s.n}</dt>
                <dd className="eyebrow mt-1.5">{s.l}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <div className="focus-peek border-t border-line">
          {experience.map((e) => (
            <motion.div key={e.repo} variants={fadeUp} style={{ ["--accent" as string]: e.accent }}>
              <a
                href={e.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-4 border-b border-line py-7 transition-colors sm:grid-cols-[5rem_minmax(0,15rem)_1fr_auto] sm:items-center sm:gap-x-8"
              >
                <span className="pointer-events-none absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-y-100" />

                <span className="font-mono text-sm text-fg-faint tabular-nums transition-colors group-hover:text-accent sm:pl-2">
                  {e.idx}
                </span>

                {/* repo identity */}
                <div className="min-w-0">
                  <div className="truncate font-mono text-sm text-fg">
                    <FlipText label={e.repo} light={e.accent} />
                  </div>
                  <div className="mt-1.5 text-xs text-fg-faint">{e.what}</div>
                  <div className="mt-3 flex items-center gap-3 font-mono text-[11px] text-fg-faint">
                    <span className="inline-flex items-center gap-1.5">
                      <Star size={11} /> {e.stars}
                    </span>
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5"
                      style={{ color: e.accent, borderColor: "color-mix(in srgb, currentColor 34%, transparent)" }}
                    >
                      <GitPullRequest size={11} /> {e.pr} merged
                    </span>
                  </div>
                </div>

                {/* the change */}
                <div className="col-span-2 sm:col-span-1">
                  <h3 className="font-display text-xl leading-snug text-fg sm:text-2xl">{e.title}</h3>
                  <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-fg-mute">{e.blurb}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-1.5">
                    {e.tags.map((t) => (
                      <span key={t} className="chip">{t}</span>
                    ))}
                    <span className="ml-1 font-mono text-[11px] text-fg-faint tabular-nums">
                      {e.diff} · {e.merged}
                    </span>
                  </div>
                </div>

                <span className="hidden h-11 w-11 place-items-center rounded-full border border-line text-fg-mute transition-all duration-300 group-hover:border-accent group-hover:text-accent sm:grid">
                  <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </motion.div>
          ))}
        </div>
      </Reveal>

{/* ── Index (signature) ─────────────────────────────── */}
      <Reveal id="index" className="mx-auto max-w-shell wrap-gutter py-20">
        <motion.div variants={fadeUp} className="mb-10 flex items-baseline justify-between">
          <h2 className="eyebrow">Index — Disciplines</h2>
        </motion.div>

        <div className="focus-peek border-t border-line">
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

                <h3 className="font-display text-3xl text-fg sm:text-4xl">
                  <FlipText label={d.name} light={d.accent} />
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

      {/* ── Stack ─────────────────────────────────────────── */}
      <Reveal className="mx-auto max-w-shell wrap-gutter py-20">
        <motion.h2 variants={fadeUp} className="eyebrow mb-10">Stack</motion.h2>
        <div className="focus-dim grid grid-cols-1 gap-4 md:grid-cols-3">
          {stackGroups.map((g) => (
            <motion.div key={g.label} variants={fadeUp}>
              <StackCard title={g.label} items={g.items} color={g.color} />
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
              I&apos;m open to internships, freelance work, and collaborations across Fullstack Web Development, Agentic AI development, System Design Architect. The fastest way to reach me is email.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="focus-peek border-t border-line">
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
                    <div className="font-mono text-sm text-fg-mute">
                      <FlipText label={c.value} light="var(--fg)" />
                    </div>
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
