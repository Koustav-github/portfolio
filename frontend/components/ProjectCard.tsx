"use client";

import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { clsx } from "clsx";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  accent?: "cyan" | "green" | "purple";
  featured?: boolean;
}

const accentColors = {
  cyan: {
    border: "hover:border-cyan-500/40 dark:hover:border-cyan-400/40",
    badge: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
    icon: "text-cyan-500 dark:text-cyan-400",
    glow: "hover:shadow-[0_8px_30px_rgba(0,245,255,0.1)]",
    dot: "bg-cyan-400",
  },
  green: {
    border: "hover:border-green-500/40 dark:hover:border-green-400/40",
    badge: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
    icon: "text-green-500 dark:text-green-400",
    glow: "hover:shadow-[0_8px_30px_rgba(0,255,159,0.1)]",
    dot: "bg-green-400",
  },
  purple: {
    border: "hover:border-purple-500/40 dark:hover:border-purple-400/40",
    badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    icon: "text-purple-500 dark:text-purple-400",
    glow: "hover:shadow-[0_8px_30px_rgba(157,78,221,0.1)]",
    dot: "bg-purple-400",
  },
};

export default function ProjectCard({
  title,
  description,
  tags,
  github,
  live,
  accent = "cyan",
  featured = false,
}: ProjectCardProps) {
  const colors = accentColors[accent];

  return (
    <div
      className={clsx(
        "group relative rounded-xl border transition-all duration-300 overflow-hidden",
        "dark:bg-[#0f0f1a] bg-white",
        "dark:border-[#1a1a2e] border-gray-200",
        "hover:-translate-y-1",
        colors.border,
        colors.glow,
        featured && "ring-1 ring-offset-0 dark:ring-cyan-500/20 ring-cyan-500/10"
      )}
    >
      {/* Top gradient line */}
      <div
        className={clsx(
          "absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          accent === "cyan" && "bg-gradient-to-r from-transparent via-cyan-400 to-transparent",
          accent === "green" && "bg-gradient-to-r from-transparent via-green-400 to-transparent",
          accent === "purple" && "bg-gradient-to-r from-transparent via-purple-400 to-transparent"
        )}
      />

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={clsx("w-2 h-2 rounded-full", colors.dot)} />
            <h3 className="font-mono font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors duration-300">
              {title}
            </h3>
          </div>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx("transition-colors duration-200", colors.icon)}
                aria-label="View on GitHub"
              >
                <Github size={16} />
              </a>
            )}
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx("transition-colors duration-200", colors.icon)}
                aria-label="View live"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
          {description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className={clsx(
                "font-mono text-xs px-2 py-0.5 rounded border",
                colors.badge
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
