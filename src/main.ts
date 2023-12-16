import "./styles/main.css";
import "./styles/tailwind.css";
import "./styles/github-markdown.css";
import * as tocbot from "tocbot";
import { common, createStarryNight } from "@wooorm/starry-night";
import { toDom } from "hast-util-to-dom";
import ClipBoard from "clipboard";

// 日夜间模式切换
type ColorSchemeType = "dark" | "light";
export let currentColorScheme: ColorSchemeType = "light"; // halo:comment日夜间模式控制

colorSchemeInit();
document.addEventListener("DOMContentLoaded", () => colorSchemeInit());

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
  if (sessionStorage.getItem("colorScheme")) return;
  isDarkModeEnabled() ? setColorScheme("dark") : setColorScheme("light");
});

function isDarkModeEnabled() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function colorSchemeInit() {
  if (sessionStorage.getItem("colorScheme")) {
    setColorScheme(sessionStorage.getItem("colorScheme") as ColorSchemeType);
  } else {
    isDarkModeEnabled() ? setColorScheme("dark") : setColorScheme("light");
  }
}

function setColorScheme(type: ColorSchemeType) {
  const html = document.documentElement;
  const colorSchemeSwitch = document.getElementById("color-scheme-switch");
  if (type === "dark") {
    currentColorScheme = "dark";
    html.classList.remove("light");
    html.classList.add("dark");
    colorSchemeSwitch?.classList.remove("i-ri-moon-clear-fill");
    colorSchemeSwitch?.classList.add("i-ri-sun-fill");
  } else {
    currentColorScheme = "light";
    html.classList.remove("dark");
    html.classList.add("light");
    colorSchemeSwitch?.classList.remove("i-ri-sun-fill");
    colorSchemeSwitch?.classList.add("i-ri-moon-clear-fill");
  }
}

export function toggleColorScheme() {
  if (currentColorScheme === "dark") {
    sessionStorage.setItem("colorScheme", "light");
    setColorScheme("light");
  } else {
    sessionStorage.setItem("colorScheme", "dark");
    setColorScheme("dark");
  }
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
    extraLinkClasses: "text-sm inline-block my-1 hover:text-sky-400",
    extraListClasses: "ml-[1em] text-slate-600 dark:text-slate-400",
    collapseDepth: 6,
    headingsOffset: 48,
    scrollSmooth: true,
    scrollSmoothOffset: -48,
  });
}

// 侧边栏控制
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

// 代码高亮
export async function highlight() {
  const starryNight = await createStarryNight(common);
  const prefix = "language-";
  const nodes = Array.from(document.querySelectorAll("pre code"));

  for (const node of nodes) {
    const className = Array.from(node.classList).find(function (d) {
      return d.startsWith(prefix);
    });
    if (!className) continue;
    const scope = starryNight.flagToScope(className.slice(prefix.length));
    if (!scope) continue;
    const tree = starryNight.highlight(node.textContent, scope);
    node.replaceChildren(toDom(tree, { fragment: true }));
  }
}

// 代码复制
export function addCodeCopyBtn() {
  const codeBlocks = document.querySelectorAll("pre code");
  codeBlocks.forEach((codeBlock) => {
    const btn = document.createElement("button");
    btn.setAttribute(
      "class",
      "copy-btn block absolute top-0 right-0 p-1 text-base text-slate-700 dark:text-slate-300 hover:text-sky-400 dark:hover:text-sky-400 transition-colors"
    );
    btn.textContent = "Copy";
    codeBlock.parentElement?.classList.add("relative");
    codeBlock.parentElement?.appendChild(btn);
  });

  const clipboard = new ClipBoard(".copy-btn", {
    target: (trigger) => trigger.parentElement.querySelector("code"),
  });

  clipboard.on("success", (e) => {
    e.trigger.textContent = "Copied!";
    setTimeout(() => {
      e.trigger.textContent = "Copy";
    }, 5000);
    e.clearSelection();
  });

  clipboard.on("error", () => alert("复制失败，请手动复制！"));
}

// 点赞
function getUpvotedNames() {
  return JSON.parse(localStorage.getItem("halo.upvoted.post.names") || "[]") as string[];
}

function activateUpvote() {
  const upvoteIcon = document.getElementById("upvote-icon");
  upvoteIcon.classList.remove("i-ri-thumb-up-line");
  upvoteIcon.classList.add("i-ri-thumb-up-fill");
  upvoteIcon.parentElement.classList.add("text-red-500", "border-red-500", "dark:border-red-500");
}

function isUpvoted(name: string) {
  return getUpvotedNames().includes(name);
}

function getPostName() {
  const upvoteContainer = document.getElementById("upvote-container");
  return upvoteContainer.dataset["postName"];
}

export function initUpvote() {
  const name = getPostName();
  console.log(name);
  if (!isUpvoted(name)) return;
  activateUpvote();
}

export function upvote() {
  const name = getPostName();
  if (isUpvoted(name)) return;

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/apis/api.halo.run/v1alpha1/trackers/upvote");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = () => {
    const upvotedNames = [...getUpvotedNames(), name];
    localStorage.setItem(`halo.upvoted.post.names`, JSON.stringify(upvotedNames));

    const upvoteCount = document.getElementById("upvote-count");

    if (!upvoteCount) return;

    const count = parseInt(upvoteCount.textContent || "0");
    upvoteCount.textContent = count + 1 + "";
    activateUpvote();
  };
  xhr.onerror = function () {
    alert("网络请求失败，请稍后再试");
  };
  xhr.send(
    JSON.stringify({
      group: "content.halo.run",
      plural: "posts",
      name: name,
    })
  );
}
