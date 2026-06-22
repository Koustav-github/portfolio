"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

/**
 * Parallax workspace photo used as the hero backdrop. Original colors,
 * masked so it dissolves left into the page behind the name.
 * Decorative (aria-hidden); holds still under prefers-reduced-motion.
 */
export default function WorkspaceBackdrop({
  src = "/workspace.png",
}: {
  src?: string;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18, mass: 0.7 });
  const sy = useSpring(my, { stiffness: 50, damping: 18, mass: 0.7 });
  const x = useTransform(sx, [-0.5, 0.5], [22, -22]);
  const y = useTransform(sy, [-0.5, 0.5], [14, -14]);

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

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-0 w-[78%] overflow-hidden sm:w-[88%] lg:w-[68%]"
    >
      {/* masked layer — image keeps its original colors */}
      <div
        className="absolute inset-0"
        style={{
          background:"blur-20",
          WebkitMaskImage: "linear-gradient(to right, #000 0%, #000 52%, transparent 96%)",
          maskImage: "linear-gradient(to left, #000 0%, #000 22%, transparent 96%)",
        }}
      >
        <motion.div style={{ x, y }} className="absolute inset-[-6%]">
          <Image
            src={src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-right"
            style={{}}
          />
        </motion.div>
      </div>

      {/* anchored blends into the page background (not parallaxed) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, var(--bg) 2%, rgba(10,10,11,0.5) 12%, transparent 55%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--bg) 0%, transparent 14%, transparent 86%, var(--bg) 100%)",
        }}
      />
    </div>
  );
}
