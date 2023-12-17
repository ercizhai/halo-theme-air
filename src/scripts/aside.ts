function openMask() {
  const mask = document.getElementById("mask");
  mask?.classList.remove("hidden");
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
