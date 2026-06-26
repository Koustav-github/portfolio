import type { ComponentType, CSSProperties } from "react";
import FlipText from "./FlipText";

/**
 * A frosted-glass stack card with neutral white styling and sharp edges.
 * `color` is the page/group theme — used only for the bottom-right shadow
 * on hover. Chips flip (dice effect) when the card is hovered/focused.
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
    <div className="glass group flex h-full flex-col p-6" tabIndex={0} style={{ ["--c"]: color } as CSSProperties}>
      <div className="relative mb-5 flex items-center gap-2.5 text-fg">
        {Icon ? <Icon size={16} /> : <span className="h-1.5 w-1.5 rounded-full bg-fg" />}
        <span className="font-mono text-sm">{title}</span>
      </div>
      <div className="relative flex flex-wrap gap-1.5">
        {items.map((t) => (
          <span key={t} className="tech">
            <FlipText label={t} light="var(--fg)" />
          </span>
        ))}
      </div>
    </div>
  );
}
