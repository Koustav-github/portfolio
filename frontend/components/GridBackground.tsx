"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface GridBackgroundProps {
  variant?: "grid" | "dots" | "matrix";
  className?: string;
}

export default function GridBackground({
  variant = "grid",
  className = "",
}: GridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const animationRef = useRef<number>();

  useEffect(() => {
    if (variant !== "matrix") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = theme === "dark";

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const cols = Math.floor(canvas.width / 20);
    const drops: number[] = Array(cols).fill(1);
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ<>{}[]()=>+-*/|&^%$#@!~";

    const draw = () => {
      ctx.fillStyle = isDark ? "rgba(9, 9, 9, 0.05)" : "rgba(240, 244, 248, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = isDark ? "rgba(0, 245, 255, 0.15)" : "rgba(8, 145, 178, 0.08)";
      ctx.font = "12px JetBrains Mono, monospace";

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * 20, drops[i] * 20);

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [variant, theme]);

  if (variant === "matrix") {
    return (
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full pointer-events-none opacity-40 ${className}`}
      />
    );
  }

  if (variant === "dots") {
    return (
      <div
        className={`absolute inset-0 pointer-events-none ${className}`}
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0, 245, 255, 0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
    );
  }

  // Default grid
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 245, 255, 0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 245, 255, 0.04) 1px, transparent 1px)
        `,
        backgroundSize: "64px 64px",
      }}
    />
  );
}
