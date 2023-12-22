import { Icons } from "tailwindcss-plugin-icons";

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
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
    })),
  ],
  safelist: [
    // TOC
    "ml-[1em]",
    // 代码复制
    "right-0",
    "absolute",
    "relative",
    // 社交媒体
    "i-ri-qq-fill",
    "i-ri-rss-fill",
    "i-ri-slack-fill",
    "i-ri-weibo-fill",
    "i-ri-zhihu-fill",
    "i-ri-github-fill",
    "i-ri-gitlab-fill",
    "i-ri-tiktok-fill",
    "i-ri-wechat-fill",
    "i-ri-douban-fill",
    "i-ri-twitter-fill",
    "i-ri-youtube-fill",
    "i-ri-discord-fill",
    "i-ri-telegram-fill",
    "i-ri-facebook-fill",
    "i-ri-linkedin-fill",
    "i-ri-whatsapp-fill",
    "i-ri-bilibili-fill",
    "i-ri-twitter-x-fill",
    "i-ri-instagram-fill",
    // 主题
    "i-ri-sun-fill",
    "i-ri-moon-clear-fill",
    // 点赞
    "text-red-500",
    "border-red-500",
    "dark:border-red-500",
    "i-ri-thumb-up-line",
    "i-ri-thumb-up-fill",
  ],
};
