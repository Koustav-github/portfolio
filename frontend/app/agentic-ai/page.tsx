"use client";

import { useRef } from "react";
import {
  BrainCircuit, ArrowLeft, Database, Bot, Network, Zap,
  ArrowRight, Search, FileText, Cpu, MessageSquare,
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
  { category: "LLM Frameworks", color: "green"  as const, items: ["LangChain", "LangGraph", "LlamaIndex", "Haystack", "CrewAI", "AutoGen", "Pydantic AI"] },
  { category: "AI / LLM APIs",  color: "cyan"   as const, items: ["OpenAI GPT-4o", "Anthropic Claude", "Google Gemini", "Cohere", "Mistral", "Groq", "Ollama"] },
  { category: "Vector Databases",color: "purple" as const, items: ["Pinecone", "Chroma", "Weaviate", "Qdrant", "pgvector", "FAISS", "Milvus"] },
  { category: "MLOps & Tools",  color: "orange" as const, items: ["Python", "FastAPI", "Docker", "LangSmith", "Weights & Biases", "Hugging Face", "Sentence Transformers"] },
];

const projects = [
  { title: "Multi-Agent Research System", description: "An autonomous research agent built with LangGraph that decomposes complex questions, delegates to specialized sub-agents, and synthesizes comprehensive answers with citations.", tags: ["LangGraph", "OpenAI", "Tavily Search", "Python", "FastAPI", "Streamlit"], accent: "green" as const, github: "https://github.com/koustavmanna", featured: true },
  { title: "Document RAG Pipeline", description: "Enterprise-grade Retrieval Augmented Generation pipeline with hybrid search (dense + sparse), re-ranking, and multi-document reasoning over uploaded PDFs.", tags: ["LangChain", "Pinecone", "OpenAI", "FastAPI", "BM25", "Cohere Rerank"], accent: "cyan" as const, github: "https://github.com/koustavmanna" },
  { title: "Code Review Agent", description: "An agentic code reviewer that analyzes GitHub PRs, identifies bugs, suggests improvements, and generates detailed review comments using Claude's extended thinking.", tags: ["Anthropic Claude", "LangChain", "GitHub API", "Python", "Docker"], accent: "purple" as const, github: "https://github.com/koustavmanna" },
  { title: "Conversational SQL Agent", description: "A natural language to SQL agent that understands schema, generates optimized queries, and explains results in plain English. Supports Postgres and SQLite.", tags: ["LangChain", "GPT-4o", "SQLAlchemy", "Streamlit", "PostgreSQL"], accent: "green" as const, github: "https://github.com/koustavmanna" },
];

const ragSteps = [
  { icon: FileText, label: "Source Docs",      desc: "PDFs, URLs, databases",           color: "cyan" },
  { icon: Cpu,      label: "Chunking",          desc: "Semantic splitting + overlap",    color: "green" },
  { icon: Database, label: "Vector Store",      desc: "Embeddings + metadata index",     color: "purple" },
  { icon: Search,   label: "Hybrid Search",     desc: "Dense + sparse (BM25)",           color: "orange" },
  { icon: Bot,      label: "LLM Generation",    desc: "Grounded, cited responses",       color: "green" },
];

const agentCode = `# LangGraph Agent with Tool Calling
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
    return f"Search results for: {query}"

@tool
def run_python(code: str) -> str:
    """Execute Python code in a sandbox."""
    return "Execution result"

llm = ChatOpenAI(model="gpt-4o", temperature=0)
tools = [search_web, run_python]
llm_with_tools = llm.bind_tools(tools)

def call_model(state: AgentState):
    response = llm_with_tools.invoke(state["messages"])
    return {"messages": [response]}

def should_continue(state: AgentState) -> str:
    last = state["messages"][-1]
    return "tools" if last.tool_calls else END

graph = StateGraph(AgentState)
graph.add_node("agent", call_model)
graph.add_node("tools", ToolNode(tools))
graph.set_entry_point("agent")
graph.add_conditional_edges("agent", should_continue)
graph.add_edge("tools", "agent")
agent = graph.compile()`;

/* ── Page ──────────────────────────────────────────────────── */
export default function AgenticAIPage() {
  return (
    <div className="relative min-h-screen">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 dark:bg-[#090909] bg-gray-50" />
        {/* Aurora orbs — green theme */}
        <div className="absolute top-[-80px] left-1/4 w-[600px] h-[400px] rounded-full dark:bg-green-500/7 bg-green-400/5 blur-3xl pointer-events-none" style={{ animation: "auroraMove 15s ease-in-out infinite" }} />
        <div className="absolute bottom-[-40px] right-[-80px] w-[350px] h-[350px] rounded-full dark:bg-teal-500/5 bg-teal-400/4 blur-3xl pointer-events-none" style={{ animation: "auroraMove 20s ease-in-out infinite reverse" }} />
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
            <span className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1 rounded-full dark:bg-green-500/10 bg-green-50 dark:border dark:border-green-500/20 border border-green-500/30 dark:text-green-400 text-green-600">
              <BrainCircuit size={11} /> domain_03 / agentic-ai-rag
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div variants={fadeUp} className="flex items-center gap-4 mb-5">
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <BrainCircuit size={30} className="dark:text-green-400 text-green-600" />
                </motion.div>
                <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                  <span className="dark:text-white text-gray-900">Agentic</span>{" "}
                  <span className="dark:text-green-400 text-green-600">AI</span>
                </h1>
              </motion.div>

              <motion.p variants={fadeUp} className="text-base text-[var(--text-secondary)] leading-relaxed mb-8 font-light max-w-lg">
                Building autonomous AI agents that reason, plan, and act. Designing RAG pipelines that ground LLMs in real data. I work with{" "}
                <span className="dark:text-green-400 text-green-600 font-semibold">LangChain</span>,{" "}
                <span className="dark:text-green-400 text-green-600 font-semibold">LangGraph</span>, and frontier models to create AI systems that actually work in production.
              </motion.p>

              <motion.div variants={stagger(0.06)} className="flex flex-wrap gap-2">
                {["LLM Agents", "RAG", "LangGraph", "LangChain", "OpenAI", "Anthropic", "Vector DBs"].map((tag) => (
                  <motion.span key={tag} variants={scaleIn} className="font-mono text-xs px-3 py-1.5 rounded-lg border dark:border-green-500/20 border-green-500/30 dark:bg-green-500/10 bg-green-50 dark:text-green-400 text-green-600">
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Hero visual — agent loop */}
            <motion.div
              variants={fadeLeft}
              className="hidden lg:block relative"
              style={{ animation: "floatY 9s ease-in-out infinite 0.5s" }}
            >
              <div className="rounded-2xl overflow-hidden border dark:border-[#1a1a2e] border-gray-200 dark:bg-[#0d0d1a] bg-white p-6 shadow-2xl dark:shadow-[0_30px_80px_rgba(0,0,0,0.7),0_0_30px_rgba(0,255,159,0.04)]">
                <div className="font-mono text-xs dark:text-green-400 text-green-600 mb-5 flex items-center gap-2">
                  <Network size={12} /> agent_loop
                </div>
                {/* Agent loop nodes */}
                <div className="flex flex-col gap-3">
                  {[
                    { icon: MessageSquare, label: "User Query",   color: "cyan",   status: "input" },
                    { icon: Bot,           label: "LLM Reasoning",color: "green",  status: "processing" },
                    { icon: Search,        label: "Tool Calls",   color: "purple", status: "active" },
                    { icon: Database,      label: "Vector Lookup",color: "orange", status: "active" },
                    { icon: FileText,      label: "Final Answer", color: "green",  status: "output" },
                  ].map(({ icon: Icon, label, color, status }, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                      className="flex items-center gap-3"
                    >
                      {i > 0 && (
                        <div className="absolute ml-3 -mt-5 h-3 w-px dark:bg-green-500/20 bg-green-200" />
                      )}
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                        color === "cyan"   ? "bg-cyan-500/10 border-cyan-500/20 dark:text-cyan-400 text-cyan-600"
                        : color === "green"  ? "bg-green-500/10 border-green-500/20 dark:text-green-400 text-green-600"
                        : color === "purple" ? "bg-purple-500/10 border-purple-500/20 dark:text-purple-400 text-purple-600"
                        : "bg-orange-500/10 border-orange-500/20 dark:text-orange-400 text-orange-600"
                      }`}>
                        <Icon size={13} />
                      </div>
                      <div className="flex-1">
                        <div className="font-mono text-xs dark:text-gray-300 text-gray-700">{label}</div>
                      </div>
                      <div className={`h-1.5 w-1.5 rounded-full ${
                        status === "output" ? "bg-green-400"
                        : status === "input" ? "bg-cyan-400"
                        : "bg-yellow-400 animate-pulse"
                      }`} />
                    </motion.div>
                  ))}
                </div>
              </div>
              {/* Thinking badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 px-3 py-2 rounded-xl dark:bg-[#0f0f1a] bg-white border dark:border-green-500/30 border-green-200 shadow-lg"
              >
                <div className="font-mono text-xs dark:text-green-400 text-green-600 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Agent reasoning...
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── Concepts Bar ───────────────────────────────────── */}
      <FadeSection className="relative py-8 border-y dark:border-[#1a1a2e] border-gray-200">
        <div className="absolute inset-0 dark:bg-[#0f0f1a] bg-green-50/40" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.div variants={stagger(0.1)} className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { label: "Agent Type",    value: "ReAct + Graph",     icon: Bot },
              { label: "Memory",        value: "Long + Short term",  icon: Database },
              { label: "Orchestration", value: "LangGraph",          icon: Network },
              { label: "Retrieval",     value: "Hybrid Search",      icon: Zap },
            ].map(({ label, value, icon: Icon }) => (
              <motion.div key={label} variants={fadeUp} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center dark:text-green-400 text-green-600 shrink-0">
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

      {/* ── RAG Pipeline (visual) ──────────────────────────── */}
      <FadeSection className="relative py-24">
        <div className="absolute inset-0 dark:bg-[#0a0a0f] bg-white" />
        <div className="absolute right-0 top-0 w-96 h-96 dark:bg-green-500/4 bg-green-400/3 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Left */}
            <motion.div variants={fadeRight}>
              <div className="font-mono text-sm dark:text-green-400 text-green-600 mb-2 flex items-center gap-2">
                <span className="dark:text-gray-500 text-gray-400">// </span>rag_architecture
              </div>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4 leading-tight">
                RAG <span className="dark:text-green-400 text-green-600">Pipeline</span> Design
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-8 font-light text-sm">
                Production RAG goes far beyond naive retrieval. I implement advanced techniques like HyDE, MMR for diversity, and cross-encoder re-ranking to maximize retrieval accuracy and answer quality.
              </p>
              <motion.ul variants={stagger(0.08)} className="space-y-3">
                {[
                  "Hybrid search (dense + sparse BM25)",
                  "Query decomposition & expansion",
                  "Contextual compression",
                  "Re-ranking with Cohere / Cross-encoder",
                  "Metadata filtering & guardrails",
                  "Streaming responses with citations",
                ].map((item) => (
                  <motion.li key={item} variants={fadeUp} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-md bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                      <ArrowRight size={10} className="dark:text-green-400 text-green-600" />
                    </div>
                    <span className="text-sm text-[var(--text-secondary)] font-light">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Right — animated RAG pipeline */}
            <motion.div variants={fadeLeft}>
              <div className="rounded-xl overflow-hidden border dark:border-[#1a1a2e] border-gray-200 shadow-2xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                <div className="flex items-center gap-2 px-4 py-3 dark:bg-[#1a1a2e] bg-gray-100 border-b dark:border-[#2a2a3e] border-gray-200">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbe2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#2ac142]" />
                  <span className="font-mono text-xs dark:text-[#546e7a] text-gray-400 ml-2">rag_pipeline</span>
                  <span className="ml-auto font-mono text-xs px-2 py-0.5 rounded dark:bg-green-500/20 bg-green-100 dark:text-green-400 text-green-600">live</span>
                </div>
                <div className="dark:bg-[#0d0d1a] bg-[#fafafa] p-6">
                  <motion.div
                    variants={stagger(0.15)}
                    className="flex flex-col gap-3"
                  >
                    {ragSteps.map(({ icon: Icon, label, desc, color }, i) => (
                      <motion.div key={label} variants={fadeUp} className="relative">
                        <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${
                          color === "cyan"   ? "dark:border-cyan-500/20 border-cyan-200 dark:bg-cyan-500/5 bg-cyan-50/50"
                          : color === "green"  ? "dark:border-green-500/20 border-green-200 dark:bg-green-500/5 bg-green-50/50"
                          : color === "purple" ? "dark:border-purple-500/20 border-purple-200 dark:bg-purple-500/5 bg-purple-50/50"
                          : "dark:border-orange-500/20 border-orange-200 dark:bg-orange-500/5 bg-orange-50/50"
                        }`}>
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            color === "cyan"   ? "bg-cyan-500/10 dark:text-cyan-400 text-cyan-600"
                            : color === "green"  ? "bg-green-500/10 dark:text-green-400 text-green-600"
                            : color === "purple" ? "bg-purple-500/10 dark:text-purple-400 text-purple-600"
                            : "bg-orange-500/10 dark:text-orange-400 text-orange-600"
                          }`}>
                            <Icon size={14} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-xs dark:text-gray-200 text-gray-700">{label}</div>
                            <div className="font-mono text-xs dark:text-gray-500 text-gray-400 truncate">{desc}</div>
                          </div>
                          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            i === ragSteps.length - 1 ? "bg-green-400"
                            : "bg-yellow-400 animate-pulse"
                          }`} />
                        </div>
                        {i < ragSteps.length - 1 && (
                          <div className="flex justify-center my-0.5">
                            <div className="w-px h-3 dark:bg-green-500/20 bg-green-200" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </FadeSection>

      {/* ── Skills ─────────────────────────────────────────── */}
      <FadeSection className="relative py-24">
        <div className="absolute inset-0 dark:bg-[#090909] bg-gray-50" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.div variants={fadeUp} className="mb-12">
            <div className="font-mono text-sm dark:text-green-400 text-green-600 mb-2 flex items-center gap-2">
              <span className="dark:text-gray-500 text-gray-400">// </span>ai_stack
            </div>
            <h2 className="text-3xl font-bold text-[var(--text-primary)]">AI / ML Toolkit</h2>
          </motion.div>
          <motion.div variants={stagger(0.1)} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {skills.map((group) => (
              <motion.div
                key={group.category}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-xl border dark:border-[#1a1a2e] border-gray-200 dark:bg-[#0f0f1a] bg-white p-5"
              >
                <div className={`font-mono text-sm font-semibold mb-4 ${
                  group.color === "green"  ? "dark:text-green-400 text-green-600"
                  : group.color === "cyan"   ? "dark:text-cyan-400 text-cyan-600"
                  : group.color === "purple" ? "dark:text-purple-400 text-purple-600"
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

      {/* ── Code ───────────────────────────────────────────── */}
      <FadeSection className="relative py-24">
        <div className="absolute inset-0 dark:bg-[#0a0a0f] bg-white" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80 dark:bg-green-500/4 bg-green-400/3 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.div variants={fadeUp} className="mb-8">
            <div className="font-mono text-sm dark:text-green-400 text-green-600 mb-2 flex items-center gap-2">
              <span className="dark:text-gray-500 text-gray-400">// </span>agent_code
            </div>
            <h2 className="text-3xl font-bold text-[var(--text-primary)]">
              LangGraph Agent <span className="dark:text-green-400 text-green-600">Implementation</span>
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="rounded-xl overflow-hidden border dark:border-[#1a1a2e] border-gray-200 shadow-2xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-2 px-4 py-3 dark:bg-[#1a1a2e] bg-gray-100 border-b dark:border-[#2a2a3e] border-gray-200">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbe2e]" />
              <div className="w-3 h-3 rounded-full bg-[#2ac142]" />
              <span className="font-mono text-xs dark:text-[#546e7a] text-gray-400 ml-2">agent.py</span>
              <span className="ml-auto font-mono text-xs px-2 py-0.5 rounded dark:bg-green-500/20 bg-green-100 dark:text-green-400 text-green-600">Python</span>
            </div>
            <div className="dark:bg-[#0d0d1a] bg-[#fafafa] p-5 overflow-x-auto max-h-80 overflow-y-auto">
              <pre className="font-mono text-xs leading-relaxed">
                {agentCode.split("\n").map((line, i) => {
                  const h = line
                    .replace(/(#.*)/g, '<span class="syntax-comment">$1</span>')
                    .replace(/\b(from|import|def|class|return|if|else|for|in|and|or|not)\b/g, '<span class="syntax-keyword">$1</span>')
                    .replace(/("(?:[^"\\]|\\.)*")/g, '<span class="syntax-string">$1</span>')
                    .replace(/\b(\d+)\b/g, '<span class="syntax-number">$1</span>')
                    .replace(/@(\w+)/g, '<span class="syntax-function">@$1</span>')
                    .replace(/\b(ChatOpenAI|StateGraph|ToolNode|TypedDict|Annotated|AgentState|END)\b/g, '<span class="syntax-type">$1</span>');
                  return (
                    <div key={i} className="flex hover:dark:bg-white/4 hover:bg-black/4 rounded px-1 transition-colors">
                      <span className="select-none w-7 dark:text-gray-700 text-gray-300 text-right mr-4 shrink-0">{i + 1}</span>
                      <span className="dark:text-gray-300 text-gray-700" dangerouslySetInnerHTML={{ __html: h }} />
                    </div>
                  );
                })}
              </pre>
            </div>
          </motion.div>
        </div>
      </FadeSection>

      {/* ── Projects ───────────────────────────────────────── */}
      <FadeSection className="relative py-24">
        <div className="absolute inset-0 dark:bg-[#090909] bg-gray-50" />
        <GridBackground variant="grid" className="opacity-20 dark:opacity-30" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.div variants={fadeUp} className="flex items-end justify-between mb-12">
            <div>
              <div className="font-mono text-sm dark:text-green-400 text-green-600 mb-2 flex items-center gap-2">
                <span className="dark:text-gray-500 text-gray-400">// </span>projects
              </div>
              <h2 className="text-3xl font-bold text-[var(--text-primary)]">AI Projects</h2>
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

      {/* ── Agent Patterns ─────────────────────────────────── */}
      <FadeSection className="relative py-24">
        <div className="absolute inset-0 dark:bg-[#0a0a0f] bg-white" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <div className="font-mono text-sm dark:text-green-400 text-green-600 mb-2 flex items-center justify-center gap-2">
              <span className="dark:text-gray-500 text-gray-400">// </span>agent_patterns
            </div>
            <h2 className="text-3xl font-bold text-[var(--text-primary)]">Agent Architectures</h2>
          </motion.div>

          <motion.div variants={stagger(0.1)} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "ReAct Agent",       desc: "Reason + Act loop with tool use and observation cycles",       color: "green" },
              { title: "Multi-Agent",       desc: "Supervisor delegates tasks to specialized sub-agents",          color: "cyan" },
              { title: "RAG Pipeline",      desc: "Retrieval-grounded generation with hybrid search",              color: "purple" },
              { title: "Self-Reflection",   desc: "Agents that critique and refine their own outputs iteratively", color: "orange" },
            ].map(({ title, desc, color }) => (
              <motion.div
                key={title}
                variants={scaleIn}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`rounded-xl border p-5 transition-all duration-300 ${
                  color === "green"  ? "dark:border-green-500/20 border-green-200 dark:bg-green-500/5 bg-green-50/50 dark:hover:border-green-500/40"
                  : color === "cyan"   ? "dark:border-cyan-500/20 border-cyan-200 dark:bg-cyan-500/5 bg-cyan-50/50 dark:hover:border-cyan-500/40"
                  : color === "purple" ? "dark:border-purple-500/20 border-purple-200 dark:bg-purple-500/5 bg-purple-50/50 dark:hover:border-purple-500/40"
                  : "dark:border-orange-500/20 border-orange-200 dark:bg-orange-500/5 bg-orange-50/50 dark:hover:border-orange-500/40"
                }`}
              >
                <div className={`font-mono text-xs font-semibold mb-3 ${
                  color === "green"  ? "dark:text-green-400 text-green-600"
                  : color === "cyan"   ? "dark:text-cyan-400 text-cyan-600"
                  : color === "purple" ? "dark:text-purple-400 text-purple-600"
                  : "dark:text-orange-400 text-orange-600"
                }`}>
                  {title}
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed font-light">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </FadeSection>
    </div>
  );
}
