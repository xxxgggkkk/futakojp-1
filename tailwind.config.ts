import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#171717",
        muted: "#707070",
        line: "#e8e8e8",
        sakura: "#f37c8e",
        matcha: "#4f8f6a",
        gold: "#b98b43"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(0, 0, 0, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
