"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)]" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="relative w-9 h-9 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center transition-all duration-300 hover:border-[var(--accent-cyan)] hover:shadow-[0_0_12px_rgba(0,245,255,0.2)] group"
    >
      <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 bg-[var(--accent-cyan)] transition-opacity duration-300" style={{ opacity: 0 }} />
      {isDark ? (
        <Sun
          size={16}
          className="text-[var(--accent-cyan)] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
        />
      ) : (
        <Moon
          size={16}
          className="text-[var(--accent-cyan)] transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
        />
      )}
    </button>
  );
}
