import "./styles/main.css";
import "./styles/tailwind.css";
import "./styles/github-markdown.css";

import Alpine from "alpinejs";

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
