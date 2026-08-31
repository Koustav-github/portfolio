"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WORDS = ["webdev", "mlops", "ai/ml"];
const TRAVEL = 32; // knob travel: track(64) - padding(8) - knob(24)

export default function Loader() {
  const [done, setDone] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [on, setOn] = useState(false);

  const finish = useCallback(() => {
    setDone(true);
    try {
      sessionStorage.setItem("km_intro", "1");
    } catch {
      /* storage may be blocked — ignore */
    }
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    let seen = false;
    try {
      seen = !!sessionStorage.getItem("km_intro");
    } catch {
      seen = false;
    }

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(prefersReduced);

    if (seen) {
      setDone(true);
      return;
    }

    document.body.style.overflow = "hidden";

    if (prefersReduced) {
      setOn(true);
      const t = window.setTimeout(finish, 450);
      return () => {
        window.clearTimeout(t);
        document.body.style.overflow = "";
      };
    }

    // flip the switch on after the intro settles, then leave the toggle
    // fully visible for a beat before lifting the curtain.
    const flip = window.setTimeout(() => setOn(true), 550);
    const close = window.setTimeout(finish, 1700);
    return () => {
      window.clearTimeout(flip);
      window.clearTimeout(close);
      document.body.style.overflow = "";
    };
  }, [finish]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />

          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid h-12 w-12 place-items-center rounded-[5px] border border-line-strong font-mono text-base font-semibold text-fg"
            >
              KM
            </motion.div>

            <div className="mt-6 overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="font-display text-2xl text-fg"
              >
                Koustav Manna
              </motion.p>
            </div>

            <div className="mt-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-fg-faint">
              {WORDS.map((w, i) => (
                <span key={w}>
                  {w}
                  {i < WORDS.length - 1 && <span className="ml-2 text-line-strong">·</span>}
                </span>
              ))}
            </div>

            {/* toggle — flips on, then the curtain lifts */}
            <div className="mt-8 flex items-center gap-3">
              <span
                className="font-mono text-[10px] uppercase tracking-widest2 transition-colors duration-300"
                style={{ color: on ? "var(--fg-faint)" : "var(--fg-mute)" }}
              >
                off
              </span>

              <div
                className="relative flex h-8 w-16 items-center rounded-full border border-line-strong p-1"
                style={{
                  background: on ? "var(--fg)" : "transparent",
                  transition: "background 0.45s ease",
                }}
              >
                <span
                  className="block h-6 w-6 rounded-full"
                  style={{
                    background: on ? "var(--bg)" : "var(--fg-mute)",
                    transform: on ? `translateX(${TRAVEL}px)` : "translateX(0)",
                    transition: reduced
                      ? "none"
                      : "transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.45s ease",
                  }}
                />
              </div>

              <span
                className="font-mono text-[10px] uppercase tracking-widest2 transition-colors duration-300"
                style={{ color: on ? "var(--fg)" : "var(--fg-faint)" }}
              >
                on
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
