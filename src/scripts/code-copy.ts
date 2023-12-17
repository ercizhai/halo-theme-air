import ClipBoard from "clipboard";

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
