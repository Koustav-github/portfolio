"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * Muted, looping background video used as faint ambient texture.
 * Autoplays only when motion is allowed; otherwise it stays paused on
 * its first frame so it never distracts. Decorative (aria-hidden).
 */
export default function AmbientVideo({
  src,
  className = "",
  style,
}: {
  src: string;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      return;
    }
    v.play().catch(() => {
      /* autoplay can be blocked — leave it on the first frame */
    });
  }, []);

  return (
    <video
      ref={ref}
      aria-hidden
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      src={src}
      className={className}
      style={style}
    />
  );
}
