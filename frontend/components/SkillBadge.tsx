"use client";

import { clsx } from "clsx";

interface SkillBadgeProps {
  name: string;
  level?: number; // 1-5
  variant?: "cyan" | "green" | "purple" | "orange" | "pink";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  animated?: boolean;
}

const variantStyles = {
  cyan: {
    wrapper: "bg-cyan-500/10 dark:bg-cyan-500/10 border-cyan-500/30 dark:border-cyan-400/30",
    text: "text-cyan-600 dark:text-cyan-400",
    dot: "bg-cyan-400",
    bar: "bg-cyan-400",
    hover: "hover:border-cyan-400/60 hover:bg-cyan-500/20 hover:shadow-[0_0_12px_rgba(0,245,255,0.2)]",
  },
  green: {
    wrapper: "bg-green-500/10 dark:bg-green-500/10 border-green-500/30 dark:border-green-400/30",
    text: "text-green-600 dark:text-green-400",
    dot: "bg-green-400",
    bar: "bg-green-400",
    hover: "hover:border-green-400/60 hover:bg-green-500/20 hover:shadow-[0_0_12px_rgba(0,255,159,0.2)]",
  },
  purple: {
    wrapper: "bg-purple-500/10 dark:bg-purple-500/10 border-purple-500/30 dark:border-purple-400/30",
    text: "text-purple-600 dark:text-purple-400",
    dot: "bg-purple-400",
    bar: "bg-purple-400",
    hover: "hover:border-purple-400/60 hover:bg-purple-500/20 hover:shadow-[0_0_12px_rgba(157,78,221,0.2)]",
  },
  orange: {
    wrapper: "bg-orange-500/10 dark:bg-orange-500/10 border-orange-500/30 dark:border-orange-400/30",
    text: "text-orange-600 dark:text-orange-400",
    dot: "bg-orange-400",
    bar: "bg-orange-400",
    hover: "hover:border-orange-400/60 hover:bg-orange-500/20",
  },
  pink: {
    wrapper: "bg-pink-500/10 dark:bg-pink-500/10 border-pink-500/30 dark:border-pink-400/30",
    text: "text-pink-600 dark:text-pink-400",
    dot: "bg-pink-400",
    bar: "bg-pink-400",
    hover: "hover:border-pink-400/60 hover:bg-pink-500/20",
  },
};

const sizeStyles = {
  sm: "px-2.5 py-1 text-xs gap-1.5",
  md: "px-3 py-1.5 text-sm gap-2",
  lg: "px-4 py-2 text-sm gap-2",
};

export default function SkillBadge({
  name,
  level,
  variant = "cyan",
  size = "md",
  icon,
  animated = true,
}: SkillBadgeProps) {
  const styles = variantStyles[variant];

  return (
    <span
      className={clsx(
        "inline-flex items-center font-mono rounded-lg border transition-all duration-300 cursor-default select-none",
        styles.wrapper,
        styles.text,
        styles.hover,
        sizeStyles[size],
        animated && "hover:-translate-y-0.5"
      )}
    >
      {icon ? (
        <span className="opacity-80">{icon}</span>
      ) : (
        <span className={clsx("w-1.5 h-1.5 rounded-full", styles.dot)} />
      )}
      <span>{name}</span>
      {level !== undefined && (
        <span className="flex items-center gap-0.5 ml-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={clsx(
                "w-1 h-1 rounded-full transition-opacity duration-300",
                i < level ? styles.dot : "bg-current opacity-20"
              )}
            />
          ))}
        </span>
      )}
    </span>
  );
}
