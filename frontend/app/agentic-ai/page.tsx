"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, Bot, Database, Search, FileText, Cpu, MessageSquare,
} from "lucide-react";
import Reveal, { fadeUp, stagger } from "@/components/Reveal";
import CodeBlock from "@/components/CodeBlock";
import ProjectCard from "@/components/ProjectCard";
import ParallaxPortrait from "@/components/ParallaxPortrait";
import StackCard from "@/components/StackCard";

const accentVars = {
  ["--accent" as string]: "#9a86e6",
  ["--accent-soft" as string]: "rgba(154,134,230,0.12)",
  ["--accent-line" as string]: "rgba(154,134,230,0.34)",
};

const conceptsBar = [
  { k: "Agent type", v: "ReAct + Graph" },
  { k: "Memory", v: "Long + short term" },
  { k: "Orchestration", v: "LangGraph" },
  { k: "Retrieval", v: "Hybrid search" },
];

const ragSteps = [
  { icon: FileText, label: "Source docs", desc: "PDFs, URLs, databases" },
  { icon: Cpu, label: "Chunking", desc: "Semantic splitting + overlap" },
  { icon: Database, label: "Vector store", desc: "Embeddings + metadata index" },
  { icon: Search, label: "Hybrid search", desc: "Dense + sparse (BM25)" },
  { icon: Bot, label: "Generation", desc: "Grounded, cited responses" },
];

const ragPrinciples = [
  "Hybrid search (dense + sparse BM25)",
  "Query decomposition & expansion",
  "Contextual compression",
  "Re-ranking with cross-encoders",
  "Metadata filtering & guardrails",
  "Streaming responses with citations",
];

const stack = [
  { group: "Frameworks", items: ["LangChain", "LangGraph", "LlamaIndex", "CrewAI", "Pydantic AI"] },
  { group: "Models", items: ["GPT-4o", "Claude", "Gemini", "Mistral", "Groq", "Ollama"] },
  { group: "Vector DBs", items: ["Pinecone", "Chroma", "Qdrant", "pgvector", "FAISS"] },
  { group: "MLOps", items: ["Python", "FastAPI", "LangSmith", "W&B", "Hugging Face"] },
];

const projects = [
  { title: "Multi-Agent Research", description: "Autonomous research agent (LangGraph) that decomposes questions, delegates to sub-agents, and synthesizes cited answers.", tags: ["LangGraph", "OpenAI", "Tavily", "FastAPI"], github: "/", featured: true },
  { title: "Document RAG Pipeline", description: "Enterprise RAG with hybrid search, re-ranking, and multi-document reasoning over uploaded PDFs.", tags: ["LangChain", "Pinecone", "BM25", "Cohere Rerank"], github: "/" },
  { title: "Code Review Agent", description: "Agentic reviewer that analyzes PRs, finds bugs, and writes review comments using Claude's extended thinking.", tags: ["Claude", "LangChain", "GitHub API", "Docker"], github: "/" },
  { title: "Conversational SQL", description: "Natural-language-to-SQL agent that understands schema, generates optimized queries, and explains results.", tags: ["LangChain", "GPT-4o", "SQLAlchemy", "Postgres"], github: "/" },
];

const patterns = [
  { t: "ReAct Agent", d: "Reason + act loop with tool use and observation cycles." },
  { t: "Multi-Agent", d: "A supervisor delegates tasks to specialized sub-agents." },
  { t: "RAG Pipeline", d: "Retrieval-grounded generation with hybrid search." },
  { t: "Self-Reflection", d: "Agents that critique and refine their own output." },
];

const agentLoop = [
  { icon: MessageSquare, label: "User query", state: "in" },
  { icon: Bot, label: "LLM reasoning", state: "run" },
  { icon: Search, label: "Tool calls", state: "run" },
  { icon: Database, label: "Vector lookup", state: "run" },
  { icon: FileText, label: "Final answer", state: "out" },
];

const code = `# LangGraph agent with tool calling
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode
from typing import TypedDict, Annotated
import operator

class AgentState(TypedDict):
    messages: Annotated[list, operator.add]

@tool
def search_web(query: str) -> str:
    """Search the web for current information."""
    return f"Results for: {query}"

llm = ChatOpenAI(model="gpt-4o", temperature=0)
llm_with_tools = llm.bind_tools([search_web])

def call_model(state: AgentState):
    response = llm_with_tools.invoke(state["messages"])
    return {"messages": [response]}

def should_continue(state: AgentState) -> str:
    last = state["messages"][-1]
    return "tools" if last.tool_calls else END

graph = StateGraph(AgentState)
graph.add_node("agent", call_model)
graph.add_node("tools", ToolNode([search_web]))
graph.set_entry_point("agent")
graph.add_conditional_edges("agent", should_continue)
graph.add_edge("tools", "agent")
agent = graph.compile()`;

export default function AgenticAIPage() {
  return (
    <div className="relative" style={accentVars}>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
        {/* faint ambient backdrop, centered, parallax + masked into the page */}
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
                  Thread 03 — Agentic AI
                </motion.p>
                <motion.h1 variants={fadeUp} className="font-display text-[clamp(2.6rem,8vw,5.5rem)] text-fg">
                  Agents that
                  <br />
                  <span style={{ color: "var(--accent)" }}>reason &amp; act.</span>
                </motion.h1>
                <motion.p variants={fadeUp} className="mt-7 max-w-lg text-pretty leading-relaxed text-fg-mute">
                  Autonomous agents that plan and use tools, and RAG pipelines that
                  ground LLMs in real data. Built with LangGraph, vector search, and
                  frontier models — for production, not demos.
                </motion.p>
                <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-1.5">
                  {["LLM Agents", "RAG", "LangGraph", "Vector DBs", "OpenAI", "Claude"].map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </motion.div>
              </div>

              <motion.div variants={fadeUp} className="hidden lg:block">
                <AgentLoopVisual />
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

      {/* ── RAG architecture ──────────────────────────────── */}
      <Reveal className="mx-auto max-w-shell wrap-gutter py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
          <motion.div variants={fadeUp}>
            <h2 className="eyebrow mb-5">RAG architecture</h2>
            <p className="font-display text-3xl leading-tight text-fg">
              Retrieval is the hard part.
            </p>
            <p className="mt-4 leading-relaxed text-fg-mute">
              Production RAG goes well beyond naive lookup. I use HyDE, MMR for
              diversity, and cross-encoder re-ranking to push retrieval accuracy and
              answer quality.
            </p>
            <ul className="mt-7 space-y-3">
              {ragPrinciples.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm text-fg-mute">
                  <span className="h-1 w-1 rounded-full" style={{ background: "var(--accent)" }} />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* pipeline flow */}
          <motion.div variants={fadeUp} className="overflow-hidden rounded-[4px] border border-line bg-raised">
            <div className="flex items-center justify-between border-b border-line bg-surface px-4 py-2.5">
              <span className="font-mono text-xs text-fg-mute">rag_pipeline</span>
              <span className="flex items-center gap-1.5 font-mono text-[11px]" style={{ color: "var(--accent)" }}>
                <span className="live-dot h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} /> live
              </span>
            </div>
            <div className="p-5">
              {ragSteps.map((s, i) => {
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
                      <span className="font-mono text-[10px] text-fg-faint tabular-nums">{i + 1}/{ragSteps.length}</span>
                    </div>
                    {i < ragSteps.length - 1 && (
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
        <div className="focus-peek grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
          <p className="font-display text-3xl leading-tight text-fg">A LangGraph agent, compiled.</p>
        </motion.div>
        <motion.div variants={fadeUp}>
          <CodeBlock code={code} filename="agent.py" lang="py" label="Python" maxHeight={440} />
        </motion.div>
      </Reveal>

      {/* ── Projects ──────────────────────────────────────── */}
      <Reveal className="mx-auto max-w-shell wrap-gutter py-20">
        <motion.div variants={fadeUp} className="mb-10 flex items-baseline justify-between">
          <h2 className="eyebrow">Selected work</h2>
          <span className="font-mono text-xs text-fg-faint">{projects.length} projects</span>
        </motion.div>
        <div className="focus-peek grid gap-5 sm:grid-cols-2">
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
        <div className="grid gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {patterns.map((p) => (
            <motion.div key={p.t} variants={fadeUp} className="bg-bg p-6">
              <div className="font-mono text-sm" style={{ color: "var(--accent)" }}>{p.t}</div>
              <p className="mt-2.5 text-sm leading-relaxed text-fg-mute">{p.d}</p>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

/* ── Agent loop visual ────────────────────────────────────── */
function AgentLoopVisual() {
  return (
    <div className="overflow-hidden rounded-[6px] border border-line bg-raised shadow-2xl">
      <div className="flex items-center justify-between border-b border-line bg-surface px-4 py-2.5">
        <span className="font-mono text-[11px] text-fg-mute">agent_loop</span>
        <span className="flex items-center gap-1.5 font-mono text-[11px]" style={{ color: "var(--accent)" }}>
          <span className="live-dot h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} /> reasoning
        </span>
      </div>
      <div className="p-5">
        {agentLoop.map((n, i) => {
          const Icon = n.icon;
          return (
            <div key={n.label}>
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[3px] border border-line bg-bg" style={{ color: "var(--accent)" }}>
                  <Icon size={14} />
                </span>
                <span className="flex-1 font-mono text-xs text-fg">{n.label}</span>
                <span
                  className={`h-1.5 w-1.5 rounded-full ${n.state === "run" ? "live-dot" : ""}`}
                  style={{
                    background:
                      n.state === "out" ? "var(--chain2)" : n.state === "in" ? "var(--web)" : "var(--accent)",
                  }}
                />
              </div>
              {i < agentLoop.length - 1 && (
                <div className="ml-4 h-4 w-px" style={{ background: "var(--accent-line)" }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
