"use client";

import { ExternalLink, Github } from "lucide-react";
import FlipText from "./FlipText";

interface ProjectCardProps {
  index: number;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  featured?: boolean;
  /** optional screenshot shown faded in the background on hover */
  image?: string;
}

export default function ProjectCard({
  index,
  title,
  description,
  tags,
  github,
  live,
  featured = false,
  image,
}: ProjectCardProps) {
  return (
    <article className="card group relative flex h-full flex-col overflow-hidden p-6 hover:-translate-y-0.5">
      {/* hover background screenshot — fades in behind the content */}
      {image && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${image}')` }} />
          {/* scrim keeps the text readable over the image */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(10,10,11,0.55) 0%, rgba(10,10,11,0.82) 100%)" }}
          />
        </div>
      )}

      {/* accent edge on hover */}
      <span
        className="pointer-events-none absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100"
        style={{ background: "var(--accent)" }}
      />

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-xs text-fg-faint tabular-nums">
            {String(index).padStart(2, "0")}
            {featured && <span className="ml-2 text-accent">★ featured</span>}
          </span>
          <div className="flex items-center gap-2 text-fg-faint opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer" aria-label="Source on GitHub" className="transition-colors hover:text-fg">
                <Github size={15} />
              </a>
            )}
            {live && (
              <a href={live} target="_blank" rel="noopener noreferrer" aria-label="Live site" className="transition-colors hover:text-fg">
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>

        <h3 className="font-display text-xl text-fg">
          <FlipText label={title} light="var(--accent)" />
        </h3>

        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-fg-mute">{description}</p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
