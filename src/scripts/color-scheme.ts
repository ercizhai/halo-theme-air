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
