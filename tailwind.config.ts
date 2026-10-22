import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        page: "rgb(var(--color-page) / <alpha-value>)",
        "page-elevated": "rgb(var(--color-page-elevated) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "surface-deep": "rgb(var(--color-surface-deep) / <alpha-value>)",
        "surface-hover": "rgb(var(--color-surface-hover) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        "muted-strong": "rgb(var(--color-muted-strong) / <alpha-value>)",
        theme: "rgb(var(--color-border) / <alpha-value>)",
        brand: {
          teal: "#16B8AD",
          "teal-dark": "#0C948D",
          "teal-light": "#38D1C7",
          black: "#171717",
          dark: "#0B0F12",
          surface: "#11161B",
          surfaceHover: "#161D24",
          border: "#1F2933",
          light: "#F7F9FA",
          muted: "#737B83",
          green: "#16A875",
          red: "#E45454",
          gold: "#E0AD1E",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      animation: {
        "ticker-scroll": "ticker 35s linear infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
        "float-gentle": "float 6s ease-in-out infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
