import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: "#1B1464",
        accent: "#2D1B69",
        cyan: "#00D4FF",
        success: "#2E7D32",
        danger: "#C62828",
        warn: "#E65100",
        ai: "#6A1B9A",
        bgDark: "#0C0820",
        bgLight: "#F0E6FF",
        purple: "#7F77DD",
        lavender: "#E8D5F5",
        indigo: "#2D1B69",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
