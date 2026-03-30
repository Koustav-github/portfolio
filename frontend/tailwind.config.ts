import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cyber: {
          black: "#090909",
          dark: "#0a0a0f",
          darker: "#05050a",
          card: "#0f0f1a",
          border: "#1a1a2e",
          cyan: "#00f5ff",
          "cyan-dim": "#00c8d4",
          green: "#00ff9f",
          "green-dim": "#00cc7a",
          purple: "#9d4edd",
          pink: "#ff006e",
          yellow: "#ffbe0b",
          orange: "#fb5607",
        },
        light: {
          bg: "#f0f4f8",
          card: "#ffffff",
          border: "#e2e8f0",
          text: "#1a202c",
          "text-muted": "#718096",
          accent: "#0891b2",
          "accent-2": "#059669",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "Cascadia Code", "monospace"],
        sans: ["Poppins", "system-ui", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      animation: {
        "typing-cursor": "blink 1s step-end infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "slide-up": "slideUp 0.6s ease-out",
        "fade-in": "fadeIn 0.8s ease-out",
        "grid-move": "gridMove 20s linear infinite",
        "scan-line": "scanLine 4s linear infinite",
        "matrix-rain": "matrixRain 2s linear infinite",
        "border-glow": "borderGlow 2s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        glowPulse: {
          "0%, 100%": {
            textShadow: "0 0 10px #00f5ff, 0 0 20px #00f5ff, 0 0 40px #00f5ff",
          },
          "50%": {
            textShadow: "0 0 5px #00f5ff, 0 0 10px #00f5ff",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        gridMove: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(60px)" },
        },
        scanLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        borderGlow: {
          "0%, 100%": { boxShadow: "0 0 5px #00f5ff, 0 0 10px #00f5ff" },
          "50%": { boxShadow: "0 0 20px #00f5ff, 0 0 40px #00f5ff, 0 0 80px #00f5ff" },
        },
      },
      backgroundImage: {
        "cyber-gradient": "linear-gradient(135deg, #090909 0%, #0a0a1a 50%, #0d0d0d 100%)",
        "neon-gradient": "linear-gradient(135deg, #00f5ff, #00ff9f)",
        "purple-gradient": "linear-gradient(135deg, #9d4edd, #00f5ff)",
        "card-gradient": "linear-gradient(145deg, #0f0f1a, #1a1a2e)",
      },
      boxShadow: {
        "neon-cyan": "0 0 20px rgba(0, 245, 255, 0.3), 0 0 40px rgba(0, 245, 255, 0.1)",
        "neon-green": "0 0 20px rgba(0, 255, 159, 0.3), 0 0 40px rgba(0, 255, 159, 0.1)",
        "neon-purple": "0 0 20px rgba(157, 78, 221, 0.3), 0 0 40px rgba(157, 78, 221, 0.1)",
        "card-dark": "0 4px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
        "card-light": "0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
