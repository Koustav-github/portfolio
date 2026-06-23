import type { CSSProperties } from "react";

/**
 * A menu label rendered as a two-faced "dice": a dim front face and a
 * bright light face. Hovering the enclosing link/button (or the label
 * itself) rotates it on the X-axis to reveal the light face.
 * Pure CSS 3D — see `.flip*` rules in globals.css.
 */
export default function FlipText({
  label,
  light,
  className = "",
}: {
  label: string;
  /** color of the revealed light face (defaults to --fg) */
  light?: string;
  className?: string;
}) {
  const style = light ? ({ ["--flip-light"]: light } as CSSProperties) : undefined;
  return (
    <span className={`flip ${className}`} style={style}>
      <span className="flip__inner">
        <span className="flip__face flip__face--front">{label}</span>
        <span className="flip__face flip__face--back" aria-hidden>
          {label}
        </span>
      </span>
    </span>
  );
}
