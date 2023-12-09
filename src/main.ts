import "./styles/main.css";
import "./styles/tailwind.css";
import "./styles/github-markdown.css";
import * as tocbot from "tocbot";

// 日夜间模式切换
type ColorSchemeType = "dark" | "light";
export let currentColorScheme: ColorSchemeType = "light"; // halo:comment日夜间模式控制
if (isDarkModeEnabled()) {
  currentColorScheme = "dark";
}

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
  currentColorScheme = isDarkModeEnabled() ? "dark" : "light";
});

function isDarkModeEnabled() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

// 目录生成
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
    extraLinkClasses: "text-sm text-slate-600 inline-block my-1 hover:text-sky-400",
    extraListClasses: "ml-[1em]",
    collapseDepth: 6,
    headingsOffset: 48,
    scrollSmooth: true,
    scrollSmoothOffset: -48,
  });
}

export function checkRightAside() {
  const aside = document.getElementById("right-aside");
  const asideOpenBtn = document.getElementById("aside-open-btn");
  if (aside?.childElementCount === 0) {
    aside.remove();
    asideOpenBtn?.firstElementChild?.remove();
  }
}

export function openLeftAside() {
  openMask();
  const leftAside = document.getElementById("left-aside");
  leftAside?.classList.remove("left-[-300px]");
  leftAside?.classList.add("left-0");
}

export function openRightAside() {
  openMask();
  const rightAside = document.getElementById("right-aside");
  rightAside?.classList.remove("right-[-300px]");
  rightAside?.classList.add("right-0");
}

export function openMask() {
  console.log("open");
  const mask = document.getElementById("mask");
  mask?.classList.remove("hidden");
}

export function closeAllAside() {
  const mask = document.getElementById("mask");
  const leftAside = document.getElementById("left-aside");
  leftAside?.classList.remove("left-0");
  leftAside?.classList.add("left-[-300px]");
  const rightAside = document.getElementById("right-aside");
  rightAside?.classList.remove("right-0");
  rightAside?.classList.add("right-[-300px]");
  mask?.classList.add("hidden");
}
