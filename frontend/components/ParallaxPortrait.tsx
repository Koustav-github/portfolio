"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

/**
 * Faint background image that drifts with the pointer.
 * `align="right"` bleeds in from the right with a left fade;
 * `align="center"` sits in the middle with a radial fade on all edges.
 * Decorative (aria-hidden). Honors reduced-motion by staying still.
 */
export default function ParallaxPortrait({
  src = "/avatar.webp",
  opacity = 0.14,
  align = "right",
}: {
  src?: string;
  opacity?: number;
  align?: "right" | "center";
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 55, damping: 20, mass: 0.6 });
  const x = useTransform(sx, [-0.5, 0.5], [22, -22]);
  const y = useTransform(sy, [-0.5, 0.5], [16, -16]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const center = align === "center";
  const mask = center
    ? "radial-gradient(ellipse 58% 64% at 50% 46%, #000 30%, transparent 80%)"
    : "linear-gradient(to left, #000 0%, #000 32%, transparent 82%)";

  return (
    <div
      aria-hidden
      className={
        center
          ? "pointer-events-none absolute inset-0 overflow-hidden"
          : "pointer-events-none absolute inset-y-0 right-0 w-full overflow-hidden sm:w-[70%] lg:w-[56%]"
      }
    >
      {/* drifting layer */}
      <motion.div style={{ x, y }} className="absolute inset-[-7%]">
        <div
          className="relative h-full w-full grayscale"
          style={{ opacity, WebkitMaskImage: mask, maskImage: mask }}
        >
          <Image
            src={src}
            alt=""
            fill
            priority
            sizes={center ? "100vw" : "60vw"}
            className={center ? "object-cover object-center" : "object-cover object-[60%_top]"}
          />
        </div>
      </motion.div>

      {/* edge blend back into the page (anchored, doesn't drift) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--bg) 0%, transparent 16%, transparent 84%, var(--bg) 100%)",
        }}
      />
    </div>
  );
}
