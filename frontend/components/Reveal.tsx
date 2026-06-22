"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease: easeOut } },
};

export const stagger = (s = 0.08, d = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: s, delayChildren: d } },
});

/** Section that animates its children in on first scroll into view. */
export default function Reveal({
  children,
  className = "",
  variants,
  as = "section",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  as?: "section" | "div";
  id?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Comp = as === "div" ? motion.div : motion.section;
  return (
    <Comp
      ref={ref}
      id={id}
      variants={variants ?? stagger(0.1)}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </Comp>
  );
}
