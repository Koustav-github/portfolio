"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Terminal } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { clsx } from "clsx";

const navLinks = [
  { href: "/",           label: "Home"       },
  { href: "/webdev",     label: "Web Dev"    },
  { href: "/blockchain", label: "Blockchain" },
  { href: "/agentic-ai", label: "Agentic AI" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled]     = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsMobileOpen(false); }, [pathname]);

  return (
    <>
      <nav
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? [
                "border-b",
                "dark:border-white/5 border-black/5",
                "dark:bg-[#090909]/80 bg-white/75",
                "backdrop-blur-xl",
                "shadow-[0_4px_30px_rgba(0,0,0,0.08)]",
              ]
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ──────────────────────────────────────── */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg border dark:border-[var(--accent-cyan)]/30 border-cyan-400/40 bg-cyan-500/10 flex items-center justify-center transition-all duration-300 group-hover:border-[var(--accent-cyan)]/70 group-hover:shadow-[0_0_12px_rgba(0,245,255,0.25)]">
                <Terminal size={13} className="text-[var(--accent-cyan)]" />
              </div>
              <span className="font-mono font-bold text-sm hidden sm:block tracking-wide">
                <span className="text-[var(--accent-cyan)]">koustav</span>
                <span className="dark:text-white/30 text-black/30">@</span>
                <span className="text-[var(--accent-green)]">dev</span>
              </span>
            </Link>

            {/* ── Desktop links ─────────────────────────────── */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={clsx(
                      "relative font-mono text-sm px-4 py-2 rounded-lg transition-all duration-200",
                      isActive
                        ? [
                            // outline-only active style
                            "text-[var(--accent-cyan)]",
                            "ring-1 ring-[var(--accent-cyan)]/50",
                            "dark:shadow-[0_0_10px_rgba(0,245,255,0.12)]",
                          ]
                        : [
                            "dark:text-white/50 text-black/50",
                            "hover:dark:text-white/80 hover:text-black/80",
                            "hover:dark:bg-white/5 hover:bg-black/5",
                          ]
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* ── Right ─────────────────────────────────────── */}
            <div className="flex items-center gap-2">
              <ThemeToggle />

              <button
                onClick={() => setIsMobileOpen((v) => !v)}
                className="md:hidden w-9 h-9 rounded-lg border dark:border-white/10 border-black/10 dark:bg-white/5 bg-black/5 flex items-center justify-center dark:text-white/60 text-black/60 hover:dark:text-white hover:text-black transition-all duration-200"
                aria-label="Toggle menu"
              >
                {isMobileOpen ? <X size={15} /> : <Menu size={15} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile menu ───────────────────────────────────── */}
        <div
          className={clsx(
            "md:hidden overflow-hidden transition-all duration-300",
            isMobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="border-t dark:border-white/5 border-black/5 dark:bg-[#090909]/90 bg-white/90 backdrop-blur-xl px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "flex items-center gap-2 font-mono text-sm px-4 py-2.5 rounded-lg transition-all duration-200",
                    isActive
                      ? "text-[var(--accent-cyan)] ring-1 ring-[var(--accent-cyan)]/40 dark:bg-[var(--accent-cyan)]/5 bg-cyan-50"
                      : "dark:text-white/50 text-black/50 hover:dark:text-white/80 hover:text-black/80 hover:dark:bg-white/5 hover:bg-black/5"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {isMobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setIsMobileOpen(false)} />
      )}
    </>
  );
}
