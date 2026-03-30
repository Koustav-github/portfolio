# Koustav Manna — Portfolio

Personal portfolio website for **Koustav Manna**, Mechanical Engineering student at Jadavpur University and developer specializing in Blockchain, Full Stack Web Development, and Agentic AI.

## Stack

| Layer            | Technology                                                  |
|------------------|-------------------------------------------------------------|
| Frontend         | Next.js 14 (App Router) · TypeScript · Tailwind CSS         |
| Animations       | Framer Motion                                               |
| Theming          | next-themes (dark / light)                                  |
| Icons            | lucide-react                                                |
| Backend          | Python · FastAPI · uvicorn                                  |
| Package managers | `bun` (frontend) · `uv` (backend)                           |

## Project Structure

```
potfolio/
├── frontend/                   # Next.js app
│   ├── app/
│   │   ├── layout.tsx          # Root layout + ThemeProvider + Navbar
│   │   ├── page.tsx            # Home — hero, about, skills, domains, contact
│   │   ├── webdev/page.tsx     # Web Development domain page
│   │   ├── blockchain/page.tsx # Blockchain / Web3 domain page
│   │   └── agentic-ai/page.tsx # Agentic AI & RAG domain page
│   ├── components/
│   │   ├── Navbar.tsx          # Sticky glassmorphism navbar
│   │   ├── ThemeToggle.tsx     # Dark / light mode toggle
│   │   ├── TypewriterText.tsx  # Cycling typewriter animation
│   │   ├── GridBackground.tsx  # Animated dot / grid / matrix backgrounds
│   │   ├── TerminalCard.tsx    # macOS-style terminal window component
│   │   ├── ProjectCard.tsx     # Animated project card
│   │   └── SkillBadge.tsx      # Colour-coded skill pill
│   ├── tailwind.config.ts
│   ├── next.config.js
│   └── package.json
│
└── backend/                    # FastAPI app
    ├── main.py                 # API routes
    ├── pyproject.toml          # uv project config
    └── .env.example            # Environment variable template
```

## Pages

| Route            | Description                                                             |
|------------------|-------------------------------------------------------------------------|
| `/`              | Hero with typewriter roles, about, skills grid, domain cards, contact   |
| `/webdev`        | Web Development — stack breakdown, code showcase, projects, workflow    |
| `/blockchain`    | Blockchain / Web3 — Solidity code, audit checklist, DeFi specializations|
| `/agentic-ai`    | Agentic AI & RAG — pipeline diagram, LangGraph code, agent patterns     |

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) `>= 1.0`
- [uv](https://docs.astral.sh/uv/) `>= 0.4`
- Python `>= 3.11`
- Node.js `>= 18` (required by Next.js internals, managed by Bun)

### Frontend

```bash
cd frontend
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

Build for production:

```bash
bun run build
bun start
```

### Backend

```bash
cd backend
cp .env.example .env   # fill in your values
uv sync
uv run python main.py
```

API runs at [http://localhost:8000](http://localhost:8000).
Interactive docs at [http://localhost:8000/docs](http://localhost:8000/docs).

## Backend API

| Method | Endpoint   | Description                        |
|--------|------------|------------------------------------|
| GET    | `/`        | Portfolio owner info + skills      |
| GET    | `/health`  | Health check                       |
| GET    | `/contact` | Contact links (email, LinkedIn, X) |
| GET    | `/projects`| Projects grouped by domain         |

## Environment Variables

Copy `backend/.env.example` to `backend/.env` and update:

```env
ENVIRONMENT=development
HOST=0.0.0.0
PORT=8000
ALLOWED_ORIGINS=http://localhost:3000

CONTACT_EMAIL=your@email.com
CONTACT_LINKEDIN=https://linkedin.com/in/yourhandle
CONTACT_TWITTER=https://x.com/yourhandle
CONTACT_GITHUB=https://github.com/yourhandle
```

## Features

- **Dark / Light mode** — defaults to dark, toggle in navbar
- **Scroll animations** — every section fades and slides in via Framer Motion
- **Glassmorphism navbar** — frosted glass on scroll, outline-only active link
- **Domain pages** — dedicated pages for Web Dev, Blockchain, and Agentic AI
- **Terminal cards** — macOS-style code windows with syntax highlighting
- **Animated hero visuals** — domain-specific floating mockups per page
- **Responsive** — mobile-first layout with animated hamburger nav

## License

MIT
