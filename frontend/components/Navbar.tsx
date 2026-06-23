"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import FlipText from "./FlipText";

const links = [
  { href: "/", label: "Index", dot: "var(--fg-faint)" },
  { href: "/webdev", label: "WebDev", dot: "var(--web)" },
  { href: "/blockchain", label: "Blockchain", dot: "var(--chain)" },
  { href: "/agentic-ai", label: "AI/ML", dot: "var(--ai)" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-shell wrap-gutter pt-3 sm:pt-4">
        <nav
          className={clsx(
            "flex h-14 items-center justify-between rounded-2xl border pl-4 pr-2.5 transition-all duration-300",
            scrolled
              ? "border-line bg-bg/80 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.75)] backdrop-blur-xl"
              : "border-line/60 bg-bg/45 backdrop-blur-md"
          )}
        >
          <Link href="/" className="group flex items-center gap-2.5" aria-label="Home">
            <span className="grid h-7 w-7 place-items-center rounded-[5px] border border-line-strong font-mono text-[11px] font-semibold tracking-tight text-fg transition-colors group-hover:border-fg">
              KM
            </span>
            <span className="font-mono text-[13px] text-fg-mute transition-colors group-hover:text-fg">
              Koustav<span className="text-fg-faint"> Manna</span>
            </span>
          </Link>

          {/* desktop */}
          <ul className="focus-peek hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const active = isActive(l.href);
              return (
                <li key={l.href} className="relative">
                  {active && (
                    <motion.span
                      layoutId="nav-jumper"
                      aria-hidden
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: `color-mix(in srgb, ${l.dot} 16%, transparent)`,
                        boxShadow: `inset 0 -2px 0 ${l.dot}`,
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.7 }}
                    />
                  )}
                  <Link
                    href={l.href}
                    className={clsx(
                      "group relative z-10 flex items-center gap-2 rounded-xl px-3.5 py-2 font-mono text-[13px] transition-colors",
                      active ? "text-fg" : "text-fg-faint hover:text-fg-mute"
                    )}
                  >
                    <span
                      className={clsx(
                        "h-1.5 w-1.5 rounded-full transition-opacity",
                        active ? "opacity-100" : "opacity-40 group-hover:opacity-80"
                      )}
                      style={{ background: l.dot }}
                    />
                    <FlipText label={l.label} light={l.dot} />
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-xl border border-line text-fg-mute transition-colors hover:text-fg md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </nav>

        {/* mobile panel */}
        <div
          className={clsx(
            "mt-2 overflow-hidden rounded-2xl border bg-bg/90 backdrop-blur-xl transition-[max-height,opacity] duration-300 md:hidden",
            open ? "max-h-72 border-line opacity-100" : "max-h-0 border-transparent opacity-0"
          )}
        >
          <ul className="px-3 py-2">
            {links.map((l) => {
              const active = isActive(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={clsx(
                      "flex items-center gap-3 rounded-xl px-3 py-3 font-mono text-sm transition-colors",
                      active ? "bg-surface text-fg" : "text-fg-mute hover:text-fg"
                    )}
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: l.dot }} />
                    <FlipText label={l.label} light={l.dot} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}
