import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"]
      },
      colors: {
        canvas: "var(--canvas)",
        panel: "var(--panel)",
        "panel-strong": "var(--panel-strong)",
        text: "var(--text)",
        muted: "var(--muted)",
        line: "var(--line)",
        brand: {
          DEFAULT: "var(--brand)",
          deep: "var(--brand-deep)",
          soft: "var(--brand-soft)"
        },
        accent: "var(--accent)",
        success: "var(--success)",
        warning: "var(--warning)"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(15, 23, 42, 0.08)",
        card: "0 10px 30px rgba(15, 23, 42, 0.06)"
      },
      borderRadius: {
        "4xl": "2rem"
      },
      maxWidth: {
        prose: "72ch"
      }
    }
  },
  plugins: []
};

export default config;
