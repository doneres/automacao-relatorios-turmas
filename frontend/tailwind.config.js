/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        // Tokens temáticos — apontam para CSS vars (trocam com html.dark)
        background: "rgb(var(--background) / <alpha-value>)",
        card:       "rgb(var(--card) / <alpha-value>)",
        muted:      "rgb(var(--muted) / <alpha-value>)",
        input:      "rgb(var(--input) / <alpha-value>)",
        border:     "rgb(var(--border) / <alpha-value>)",
        foreground:          "rgb(var(--foreground) / <alpha-value>)",
        "muted-foreground":  "rgb(var(--muted-foreground) / <alpha-value>)",
        // Marca Ctrl+Play
        brand:       "#ff6b35",
        "brand-amber": "#f7931e",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
      },
      animation: {
        "spin-slow": "spin 1.2s linear infinite",
      },
    },
  },
  plugins: [],
};
