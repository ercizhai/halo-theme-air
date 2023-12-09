import { Icons } from "tailwindcss-plugin-icons";

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: ["./templates/**/*.html", "./src/main.ts"],
  theme: {
    screens: {
      tablet: "960px",
      laptop: "1280px",
      desktop: "1680px",
    },
  },
  plugins: [
    Icons(() => ({
      ri: {
        includeAll: true,
      },
      simpleIcons: {
        includeAll: true,
      },
    })),
  ],
};
