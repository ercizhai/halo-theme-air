import { Icons } from "tailwindcss-plugin-icons";

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: ["./templates/**/*.html", "./src/main.ts"],
  theme: {
    extend: {},
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
