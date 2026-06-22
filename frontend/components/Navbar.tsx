"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { clsx } from "clsx";

const links = [
  { href: "/", label: "Index", idx: "00", dot: "var(--fg-faint)" },
  { href: "/webdev", label: "Web", idx: "01", dot: "var(--web)" },
  { href: "/blockchain", label: "Chain", idx: "02", dot: "var(--chain)" },
  { href: "/agentic-ai", label: "Agents", idx: "03", dot: "var(--ai)" },
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
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-line bg-bg/85 backdrop-blur-md" : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-14 max-w-shell items-center justify-between wrap-gutter">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="Home">
          <span className="grid h-7 w-7 place-items-center rounded-[3px] border border-line-strong font-mono text-[11px] font-semibold tracking-tight text-fg transition-colors group-hover:border-fg">
            KM
          </span>
          <span className="font-mono text-[13px] text-fg-mute transition-colors group-hover:text-fg">
            koustav<span className="text-fg-faint">.manna</span>
          </span>
        </Link>

        {/* desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={clsx(
                    "group flex items-center gap-2 rounded-[3px] px-3 py-2 font-mono text-[13px] transition-colors",
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
                  <span className="tabular-nums text-fg-faint">{l.idx}</span>
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-[3px] border border-line text-fg-mute transition-colors hover:text-fg md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </nav>

      {/* mobile */}
      <div
        className={clsx(
          "overflow-hidden border-t border-line bg-bg/95 backdrop-blur-md transition-[max-height,opacity] duration-300 md:hidden",
          open ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ul className="wrap-gutter py-3">
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={clsx(
                    "flex items-center gap-3 py-3 font-mono text-sm",
                    active ? "text-fg" : "text-fg-mute"
                  )}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: l.dot }} />
                  <span className="tabular-nums text-fg-faint">{l.idx}</span>
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
