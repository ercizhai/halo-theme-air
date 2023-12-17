import * as tocbot from "tocbot";

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
