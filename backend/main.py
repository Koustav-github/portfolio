"""
Portfolio Backend API
Author: Koustav Manna
"""

import os
from datetime import datetime
from typing import Any

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

load_dotenv()

# ── Config ─────────────────────────────────────────────────────────────────────

ALLOWED_ORIGINS_RAW = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:3000,http://127.0.0.1:3000",
)
ALLOWED_ORIGINS = [o.strip() for o in ALLOWED_ORIGINS_RAW.split(",")]

# ── App ────────────────────────────────────────────────────────────────────────

app = FastAPI(
    title="Koustav Manna — Portfolio API",
    description="Backend API for Koustav Manna's portfolio website.",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routes ─────────────────────────────────────────────────────────────────────


@app.get("/", summary="Portfolio owner info")
async def root() -> dict[str, Any]:
    """Returns basic information about the portfolio owner."""
    return {
        "name": "Koustav Manna",
        "title": "Blockchain Developer · Full Stack Engineer · AI Engineer",
        "university": "Jadavpur University",
        "department": "Mechanical Engineering",
        "domains": [
            "Blockchain / Ethereum",
            "Web Development",
            "Agentic AI & RAG",
        ],
        "skills": {
            "blockchain": ["Solidity", "Ethereum", "Web3.js", "Ethers.js", "DeFi", "Smart Contracts"],
            "webdev": ["Next.js", "React", "TypeScript", "Node.js", "FastAPI", "PostgreSQL"],
            "ai": ["LangChain", "LangGraph", "RAG Pipelines", "OpenAI", "Anthropic", "Vector Databases"],
        },
        "status": "open_to_opportunities",
        "api_version": "0.1.0",
    }


@app.get("/health", summary="Health check")
async def health() -> dict[str, str]:
    """Health check endpoint for uptime monitoring."""
    return {
        "status": "healthy",
        "service": "portfolio-backend",
        "timestamp": datetime.utcnow().isoformat() + "Z",
    }


@app.get("/contact", summary="Contact information")
async def contact() -> dict[str, str]:
    """Returns contact information for Koustav Manna."""
    return {
        "email": os.getenv("CONTACT_EMAIL", "koustav@example.com"),
        "linkedin": os.getenv("CONTACT_LINKEDIN", "https://linkedin.com/in/koustavmanna"),
        "twitter": os.getenv("CONTACT_TWITTER", "https://twitter.com/koustavmanna"),
        "github": os.getenv("CONTACT_GITHUB", "https://github.com/koustavmanna"),
    }


@app.get("/projects", summary="List projects")
async def projects() -> dict[str, Any]:
    """Returns a list of projects grouped by domain."""
    return {
        "blockchain": [
            {
                "title": "DeFi Yield Aggregator",
                "description": "Gas-optimized yield farming aggregator across Aave, Compound, and Yearn.",
                "tags": ["Solidity", "Hardhat", "Ethers.js", "React", "Aave"],
            },
            {
                "title": "NFT Marketplace",
                "description": "Decentralized NFT marketplace with lazy minting and ERC-2981 royalties.",
                "tags": ["Solidity", "ERC-721", "Next.js", "IPFS", "Wagmi"],
            },
        ],
        "webdev": [
            {
                "title": "FullStack Task Manager",
                "description": "Real-time collaborative task management with Next.js App Router and Postgres.",
                "tags": ["Next.js", "TypeScript", "PostgreSQL", "WebSockets"],
            },
            {
                "title": "REST API Boilerplate",
                "description": "Production-ready Node.js + TypeScript REST API template.",
                "tags": ["Node.js", "TypeScript", "Express", "Docker"],
            },
        ],
        "ai": [
            {
                "title": "Multi-Agent Research System",
                "description": "Autonomous research agent with LangGraph sub-agent delegation.",
                "tags": ["LangGraph", "OpenAI", "Python", "FastAPI"],
            },
            {
                "title": "Document RAG Pipeline",
                "description": "Enterprise-grade RAG with hybrid search and cross-encoder re-ranking.",
                "tags": ["LangChain", "Pinecone", "OpenAI", "BM25"],
            },
        ],
    }


# ── Entry point ────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", "8000")),
        reload=os.getenv("ENVIRONMENT", "development") == "development",
        log_level="info",
    )
