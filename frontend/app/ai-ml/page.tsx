"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, Database, Layers, Cpu, LineChart, Server,
} from "lucide-react";
import Reveal, { fadeUp, stagger } from "@/components/Reveal";
import CodeBlock from "@/components/CodeBlock";
import ProjectCard from "@/components/ProjectCard";
import ParallaxPortrait from "@/components/ParallaxPortrait";
import StackCard from "@/components/StackCard";
import FlipText from "@/components/FlipText";

const accentVars = {
  ["--accent" as string]: "#9a86e6",
  ["--accent-soft" as string]: "rgba(154,134,230,0.12)",
  ["--accent-line" as string]: "rgba(154,134,230,0.34)",
};

const conceptsBar = [
  { k: "Frameworks", v: "PyTorch · TF" },
  { k: "Domains", v: "CV · NLP · LLMs" },
  { k: "Training", v: "GPU · mixed precision" },
  { k: "Serving", v: "FastAPI · ONNX" },
];

const lifecycle = [
  { icon: Database, label: "Data", desc: "Collection, cleaning, versioning" },
  { icon: Layers, label: "Features", desc: "Transforms + augmentation" },
  { icon: Cpu, label: "Train", desc: "GPU, schedulers, checkpoints" },
  { icon: LineChart, label: "Evaluate", desc: "Metrics, validation, ablations" },
  { icon: Server, label: "Serve", desc: "API, quantization, monitoring" },
];

const principles = [
  "Reproducible training (seeds + configs)",
  "Experiment tracking with W&B / MLflow",
  "Rigorous evaluation, not just accuracy",
  "Transfer learning & fine-tuning",
  "Quantization for fast inference",
  "Monitored, versioned model serving",
];

const stack = [
  { group: "Deep Learning", items: ["PyTorch", "TensorFlow", "Keras", "JAX", "CUDA"] },
  { group: "Classical ML", items: ["scikit-learn", "XGBoost", "pandas", "NumPy", "SciPy"] },
  { group: "LLMs & Agents", items: ["Hugging Face", "Transformers", "LangChain", "LangGraph", "RAG"] },
  { group: "MLOps", items: ["FastAPI", "Docker", "ONNX", "W&B", "MLflow"] },
];

const projects = [
  { title: "Verity", description: "An AI/ML project built in Python.", tags: ["Python", "ML"], github: "https://github.com/Koustav-github/Verity", featured: true },
  { title: "FreshlyFishy", description: "An AI/ML project built in Python.", tags: ["Python", "ML"], github: "https://github.com/Koustav-github?tab=repositories", image: "/Freshly_fishy.webp" },
];

const patterns = [
  { t: "CNNs", d: "Convolutional nets for image classification and detection." },
  { t: "Transformers", d: "Attention-based models for language and sequences." },
  { t: "Transfer Learning", d: "Fine-tuning pretrained backbones on small data." },
  { t: "RAG & Agents", d: "Grounding and tool-use on top of LLMs." },
];

const trainLog = [
  { e: "08/10", loss: "0.214", acc: "94.2%" },
  { e: "09/10", loss: "0.187", acc: "95.1%" },
  { e: "10/10", loss: "0.169", acc: "95.8%", best: true },
];

const code = `# CNN image classifier — training step (PyTorch)
import torch
import torch.nn as nn
import torch.nn.functional as F

class SmallCNN(nn.Module):
    def __init__(self, num_classes=10):
        super().__init__()
        self.conv1 = nn.Conv2d(3, 32, 3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, 3, padding=1)
        self.pool = nn.MaxPool2d(2)
        self.fc = nn.Linear(64 * 8 * 8, num_classes)

    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = torch.flatten(x, 1)
        return self.fc(x)

model = SmallCNN().to("cuda")
optimizer = torch.optim.AdamW(model.parameters(), lr=3e-4)
criterion = nn.CrossEntropyLoss()

for images, labels in train_loader:
    images, labels = images.to("cuda"), labels.to("cuda")
    optimizer.zero_grad()
    loss = criterion(model(images), labels)
    loss.backward()
    optimizer.step()`;

export default function AiMlPage() {
  return (
    <div className="relative" style={accentVars}>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
        <ParallaxPortrait src="/aiml.webp" opacity={0.16} align="center" />
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
                  Thread 02 — AI / ML
                </motion.p>
                <motion.h1 variants={fadeUp} className="font-display text-[clamp(2.6rem,8vw,5.5rem)] text-fg">
                  Models that
                  <br />
                  <span style={{ color: "var(--accent)" }}>learn &amp; reason.</span>
                </motion.h1>
                <motion.p variants={fadeUp} className="mt-7 max-w-lg text-pretty leading-relaxed text-fg-mute">
                  Machine learning and deep learning end to end — training neural nets,
                  fine-tuning transformers, and building LLM systems with RAG and
                  agents. From dataset to a monitored endpoint.
                </motion.p>
                <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-1.5">
                  {["Deep Learning", "PyTorch", "NLP", "Computer Vision", "LLMs", "RAG"].map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </motion.div>
              </div>

              <motion.div variants={fadeUp} className="hidden lg:block">
                <TrainingVisual />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Concepts bar ──────────────────────────────────── */}
      <Reveal className="border-b border-line">
        <div className="mx-auto grid max-w-shell grid-cols-2 gap-px overflow-hidden wrap-gutter sm:grid-cols-4">
          {conceptsBar.map((s) => (
            <motion.div key={s.k} variants={fadeUp} className="py-6">
              <div className="eyebrow mb-1.5">{s.k}</div>
              <div className="font-mono text-sm text-fg">{s.v}</div>
            </motion.div>
          ))}
        </div>
      </Reveal>

      {/* ── ML lifecycle ──────────────────────────────────── */}
      <Reveal className="mx-auto max-w-shell wrap-gutter py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
          <motion.div variants={fadeUp}>
            <h2 className="eyebrow mb-5">The ML lifecycle</h2>
            <p className="font-display text-3xl leading-tight text-fg">
              From data to deployment.
            </p>
            <p className="mt-4 leading-relaxed text-fg-mute">
              A model is only as good as the pipeline around it. I treat data,
              training, evaluation, and serving as one reproducible system — tracked,
              versioned, and measured.
            </p>
            <ul className="mt-7 space-y-3">
              {principles.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm text-fg-mute">
                  <span className="h-1 w-1 rounded-full" style={{ background: "var(--accent)" }} />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} className="overflow-hidden rounded-[4px] border border-line bg-raised">
            <div className="flex items-center justify-between border-b border-line bg-surface px-4 py-2.5">
              <span className="font-mono text-xs text-fg-mute">pipeline</span>
              <span className="flex items-center gap-1.5 font-mono text-[11px]" style={{ color: "var(--accent)" }}>
                <span className="live-dot h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} /> running
              </span>
            </div>
            <div className="p-5">
              {lifecycle.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.label}>
                    <div className="flex items-center gap-3 rounded-[4px] border border-line bg-bg p-3">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[3px]" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>
                        <Icon size={14} />
                      </span>
                      <span className="flex-1">
                        <span className="block font-mono text-xs text-fg">{s.label}</span>
                        <span className="block font-mono text-[11px] text-fg-faint">{s.desc}</span>
                      </span>
                      <span className="font-mono text-[10px] text-fg-faint tabular-nums">{i + 1}/{lifecycle.length}</span>
                    </div>
                    {i < lifecycle.length - 1 && (
                      <div className="ml-7 h-3 w-px" style={{ background: "var(--accent-line)" }} />
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
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
          <h2 className="eyebrow mb-3">Implementation</h2>
          <p className="font-display text-3xl leading-tight text-fg">A CNN, training in PyTorch.</p>
        </motion.div>
        <motion.div variants={fadeUp}>
          <CodeBlock code={code} filename="train.py" lang="py" label="Python" maxHeight={460} />
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

      {/* ── Patterns ──────────────────────────────────────── */}
      <Reveal className="mx-auto max-w-shell wrap-gutter py-20">
        <motion.h2 variants={fadeUp} className="eyebrow mb-10">Architectures</motion.h2>
        <div className="focus-dim grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {patterns.map((p, i) => (
            <motion.div key={p.t} variants={fadeUp} className="group relative flex flex-col overflow-hidden border border-line p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1.5 hover:border-line-strong">
              <span className="pointer-events-none absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100" style={{ background: "var(--accent)" }} />
              {/* chronological number — fades in at bottom-left on hover */}
              <span aria-hidden className="pointer-events-none absolute -bottom-4 -left-1 font-display text-[5.5rem] leading-none opacity-0 transition-opacity duration-300 group-hover:opacity-[0.14]" style={{ color: "var(--accent)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative">
                <h3 className="font-mono text-sm text-fg">
                  <FlipText label={p.t} light="var(--accent)" />
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-fg-mute">{p.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

/* ── Training log visual ──────────────────────────────────── */
function TrainingVisual() {
  return (
    <div className="overflow-hidden rounded-[6px] border border-line bg-raised shadow-2xl">
      <div className="flex items-center justify-between border-b border-line bg-surface px-4 py-2.5">
        <span className="font-mono text-[11px] text-fg-mute">train.py · epoch log</span>
        <span className="flex items-center gap-1.5 font-mono text-[11px]" style={{ color: "var(--accent)" }}>
          <span className="live-dot h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} /> training
        </span>
      </div>
      <div className="p-5">
        <div className="space-y-px overflow-hidden rounded-[4px] border border-line bg-line">
          {trainLog.map((r) => (
            <div key={r.e} className="flex items-center justify-between bg-bg px-3 py-2.5 font-mono text-xs">
              <span className="text-fg-faint">epoch {r.e}</span>
              <span className="text-fg-mute">loss {r.loss}</span>
              <span className="flex items-center gap-2">
                <span className="text-fg">acc {r.acc}</span>
                {r.best && (
                  <span
                    className="rounded-full border px-2 py-0.5 text-[10px]"
                    style={{ color: "var(--accent)", borderColor: "var(--accent-line)" }}
                  >
                    best
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <div className="mb-1.5 flex justify-between font-mono text-[11px] text-fg-faint">
            <span>training loss</span>
            <span>0.169</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-surface">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "var(--accent)" }}
              initial={{ width: "100%" }}
              whileInView={{ width: "17%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
