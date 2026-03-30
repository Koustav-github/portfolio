"use client";

import { clsx } from "clsx";

interface TerminalCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  showCursor?: boolean;
  prompt?: string;
  variant?: "default" | "minimal";
}

export default function TerminalCard({
  title = "terminal",
  children,
  className,
  showCursor = false,
  prompt = "$",
  variant = "default",
}: TerminalCardProps) {
  return (
    <div
      className={clsx(
        "rounded-xl overflow-hidden border transition-all duration-300",
        "dark:bg-[#0d0d1a] dark:border-[#1a1a2e]",
        "bg-gray-50 border-gray-200",
        className
      )}
    >
      {variant === "default" && (
        <div className="flex items-center gap-2 px-4 py-3 dark:bg-[#1a1a2e] bg-gray-100 border-b dark:border-[#2a2a3e] border-gray-200">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbe2e]" />
            <div className="w-3 h-3 rounded-full bg-[#2ac142]" />
          </div>
          <div className="flex-1 text-center">
            <span className="font-mono text-xs dark:text-[#546e7a] text-gray-400">
              {title}
            </span>
          </div>
        </div>
      )}
      <div className="p-5 font-mono text-sm">
        {prompt && (
          <div className="flex items-start gap-2 mb-3">
            <span className="text-[var(--accent-cyan)] select-none">{prompt}</span>
            <div className="flex-1">{children}</div>
          </div>
        )}
        {!prompt && children}
        {showCursor && (
          <span className="inline-block w-2 h-4 bg-[var(--accent-cyan)] animate-[blink_1s_step-end_infinite] ml-1 align-middle" />
        )}
      </div>
    </div>
  );
}
