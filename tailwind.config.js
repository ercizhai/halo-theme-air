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
  safelist: [
    "i-ri-github-fill",
    "i-ri-gitlab-fill",
    "i-ri-twitter-fill",
    "i-ri-twitter-x-fill",
    "i-ri-telegram-fill",
    "i-ri-facebook-fill",
    "i-ri-linkedin-fill",
    "i-ri-slack-fill",
    "i-ri-youtube-fill",
    "i-ri-tiktok-fill",
    "i-ri-instagram-fill",
    "i-ri-whatsapp-fill",
    "i-ri-discord-fill",
    "i-ri-rss-fill",
    "i-ri-weibo-fill",
    "i-ri-bilibili-fill",
    "i-ri-wechat-fill",
    "i-ri-qq-fill",
    "i-ri-zhihu-fill",
    "i-ri-douban-fill",
  ],
};
