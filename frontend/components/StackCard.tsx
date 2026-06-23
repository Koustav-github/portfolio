import type { ComponentType, CSSProperties } from "react";

/**
 * A frosted-glass stack card. Technologies render in the card's theme
 * color (`color`), and the card lifts + glows on hover / keyboard focus.
 * Glass + token styles live in globals.css (`.glass`, `.tech`).
 */
export default function StackCard({
  title,
  items,
  color = "var(--fg)",
  icon: Icon,
}: {
  title: string;
  items: string[];
  color?: string;
  icon?: ComponentType<{ size?: number | string }>;
}) {
  return (
    <div className="glass p-6" tabIndex={0} style={{ ["--c"]: color } as CSSProperties}>
      <div className="relative mb-5 flex items-center gap-2.5" style={{ color }}>
        {Icon ? <Icon size={16} /> : <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />}
        <span className="font-mono text-sm">{title}</span>
      </div>
      <div className="relative flex flex-wrap gap-1.5">
        {items.map((t) => (
          <span key={t} className="tech">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
