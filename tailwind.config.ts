import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        night: "#14121C",
        nightsoft: "#1C1926",
        ink: "#F4EFE8",
        muted: "#8B8598",
        line: "#2A2636",
        cool: "#6EA8FF",
        dawn: "#F5B549",
        dawn2: "#FF9E6D",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "dawn-gradient": "linear-gradient(100deg, #F5B549, #FF9E6D)",
      },
      maxWidth: {
        content: "1180px",
      },
      screens: {
        // single-column below ~860px
        wide: "860px",
      },
      keyframes: {
        "orb-drift": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(4%, -6%, 0) scale(1.08)" },
        },
        "ring-pulse": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.6)", opacity: "0" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.15" },
        },
      },
      animation: {
        "orb-drift": "orb-drift 18s ease-in-out infinite",
        "ring-pulse": "ring-pulse 2.4s ease-out infinite",
        blink: "blink 1.2s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;
