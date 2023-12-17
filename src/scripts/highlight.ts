import { common, createStarryNight } from "@wooorm/starry-night";
import { toDom } from "hast-util-to-dom";

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
