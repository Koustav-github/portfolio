"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, summary, [data-cursor]";

/**
 * Custom pointer: an instant dot + a trailing ring that adopts the active
 * domain accent (reads the cascading --accent under the pointer) and grows
 * over interactive elements. Mouse only; hidden on touch / reduced-motion.
 */
export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 });
  const ry = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 });

  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [accent, setAccent] = useState("var(--fg)");

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      if (!t || !t.closest) return;
      setHovering(!!t.closest(INTERACTIVE));
      const a = getComputedStyle(t).getPropertyValue("--accent").trim();
      if (a) setAccent(a);
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("cursor-none");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* trailing ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90]"
        style={{ x: rx, y: ry, opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className="rounded-full border"
          style={{ borderColor: accent, translate: "-50% -50%" }}
          animate={{
            width: hovering ? 46 : 28,
            height: hovering ? 46 : 28,
            backgroundColor: hovering
              ? `color-mix(in srgb, ${accent} 12%, transparent)`
              : "rgba(0,0,0,0)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        />
      </motion.div>

      {/* instant dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90]"
        style={{ x, y, opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className="rounded-full"
          style={{ backgroundColor: accent, translate: "-50% -50%" }}
          animate={{ width: hovering ? 5 : 6, height: hovering ? 5 : 6 }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </>
  );
}
