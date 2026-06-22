"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WORDS = ["web", "chain", "ai"];

export default function Loader() {
  const [done, setDone] = useState(false);
  const [reduced, setReduced] = useState(false);

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
    const ms = prefersReduced ? 350 : 1500;
    const main = window.setTimeout(finish, ms);
    // safety net: never let the curtain hang
    const fallback = window.setTimeout(finish, 4000);

    return () => {
      window.clearTimeout(main);
      window.clearTimeout(fallback);
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
                <motion.span
                  key={w}
                  initial={{ opacity: 0.25 }}
                  animate={{ opacity: [0.25, 1, 0.25] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                >
                  {w}
                  {i < WORDS.length - 1 && <span className="ml-2 text-line-strong">·</span>}
                </motion.span>
              ))}
            </div>

            {/* progress line */}
            <div className="mt-7 h-px w-44 overflow-hidden bg-line">
              <motion.div
                className="h-full bg-fg"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: reduced ? 0.3 : 1.3, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
