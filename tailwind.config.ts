import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#FF1744",
          blue: "#1565C0",
          yellow: "#FFD600",
          orange: "#FF6D00",
          pink: "#F50057",
          green: "#00C853",
          purple: "#AA00FF",
          "red-dark": "#D50000",
          "blue-dark": "#0D47A1",
          "red-light": "#FF616F",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

export default config;
