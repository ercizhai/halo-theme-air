import "./styles/main.css";
import "./styles/tailwind.css";
import "./styles/github-markdown.css";

import "./scripts/header";

export { generateToc } from "./scripts/toc";
export { backTop } from "./scripts/back-top";
export { highlight } from "./scripts/highlight";
export { addCodeCopyBtn } from "./scripts/code-copy";
export { initUpvote, upvote } from "./scripts/upvote";
export { currentColorScheme, toggleColorScheme } from "./scripts/color-scheme";
export { checkRightAside, openLeftAside, openRightAside, closeAllAside } from "./scripts/aside";
