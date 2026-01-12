import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1F9D8F",
        },
        background: {
          DEFAULT: "#FFFFFF",
          light: "#F7F9FC",
        },
        text: {
          primary: "#0B1F33",
          secondary: "#4B5563",
        },
        border: {
          DEFAULT: "#E5E7EB",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "75ch",
      },
    },
  },
  plugins: [],
};
export default config;
