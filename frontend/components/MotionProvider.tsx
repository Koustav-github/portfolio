"use client";

import { MotionConfig } from "framer-motion";

/**
 * App-wide motion settings. `reducedMotion="user"` makes every Framer
 * animation (including layout/shared-element ones like the nav jumper)
 * snap instantly when the OS requests reduced motion.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
