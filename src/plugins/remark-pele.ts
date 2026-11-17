import { fromHtmlIsomorphic } from "hast-util-from-html-isomorphic";
import { PeleError, render } from "pele";
import type { VFile } from "vfile";

interface MdNode {
  type: string;
  lang?: string | null;
  value?: string;
  children?: MdNode[];
  position?: object | null;
  data?: {
    hChildren?: unknown[];
  };
}

/**
 * Render ```mermaid fences to inline SVG with Pele during the markdown build.
 * Pele is synchronous and does not need a browser, so this replaces
 * astro-mermaid (which left <pre class="mermaid"> for mermaid.js in the browser).
 *
 * `data.hChildren` is the parsed SVG. remark-rehype uses it for both Markdown
 * and MDX so the diagram is emitted as markup instead of escaped text.
 *
 * Same approach as https://github.com/larb26656/luckytime1996-blog/blob/main/src/plugins/remark-pele.ts
 */
export default function remarkPele() {
  return function (tree: MdNode, file: VFile) {
    let diagramIndex = 0;

    const walk = (node: MdNode) => {
      if (!node.children) return;

      for (let index = 0; index < node.children.length; index++) {
        const child = node.children[index];
        if (child.type === "code" && child.lang === "mermaid") {
          const idPrefix = `mermaid-${diagramIndex++}`;
          let svg: string;
          try {
            svg = render(child.value ?? "", {
              idPrefix,
              responsive: true,
            }).svg;
          } catch (error) {
            const reason =
              error instanceof PeleError
                ? error.message
                : error instanceof Error
                  ? error.message
                  : String(error);
            const message = file.message(
              `Could not render Mermaid diagram with Pele: ${reason}`,
              child,
            );
            message.fatal = true;
            throw message;
          }

          node.children[index] = {
            type: "paragraph",
            children: [{ type: "html", value: svg }],
            data: {
              hChildren: fromHtmlIsomorphic(svg, { fragment: true }).children,
            },
          };
          continue;
        }

        walk(child);
      }
    };

    walk(tree);
  };
}
