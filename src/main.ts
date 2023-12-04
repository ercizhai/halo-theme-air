import "./styles/main.css";
import "./styles/tailwind.css";
import "./styles/github-markdown.css";

import Alpine from "alpinejs";
import * as tocbot from "tocbot";

window.Alpine = Alpine;

Alpine.start();

type ColorSchemeType = "dark" | "light";
export let currentColorScheme: ColorSchemeType = "light";
if (isDarkModeEnabled()) {
  currentColorScheme = "dark";
}

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
  currentColorScheme = isDarkModeEnabled() ? "dark" : "light";
});

function isDarkModeEnabled() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function generateToc() {
  const content = document.querySelector(".markdown-body");
  const titles = content?.querySelectorAll("h1, h2, h3, h4");
  if (!titles || titles.length === 0) {
    const tocContainer = document.querySelector(".toc-container");
    tocContainer?.remove();
    return;
  }
  tocbot.init({
    tocSelector: ".toc",
    contentSelector: ".markdown-body",
    headingSelector: "h1, h2, h3, h4",
    activeLinkClass: "toc-active-link",
    extraLinkClasses: "text-base text-slate-600 inline-block my-1 hover:text-sky-400",
    extraListClasses: "ml-[1em]",
    collapseDepth: 6,
    headingsOffset: 100,
    scrollSmooth: true,
  });
}
