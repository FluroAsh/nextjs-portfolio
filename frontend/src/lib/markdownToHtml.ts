import rehypeAutoLinkHeadings, { type Options } from "rehype-autolink-headings"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"
import { visit } from "unist-util-visit"

/** Serialize Markdown into HTML
 * - [remarkParse](https://github.com/remarkjs/remark/tree/main/packages/remark-parse): Parse Markdown into an AST
 * - [remarkRehype](https://github.com/remarkjs/remark-rehype): Transform Markdown AST into HTML AST
 * - [rehypeStringify](https://www.npmjs.com/package/rehype-stringify): Serialize HTML AST into HTML string
 *
 * @param markdown Markdown string to be serialized
 */
export async function markdownToHtml(markdown: string) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(() => {
      return (tree) => {
        visit(tree, "element", (node: any) => {
          if (node.tagName === "img") {
            node.properties.loading = "lazy"
            const src = node.properties.src

            const fileName = src.split(".amazonaws.com/")[1]
            const origin = src.split(fileName)[0]

            // Add responsiveness to images rendered from markdown
            node.properties.srcset = `
            ${origin}medium_${fileName} 750w,
            ${origin}large_${fileName} 1000w,
          `

            node.properties.sizes = "(max-width: 600px) 750px, 1000px"
          }

          if (
            node.tagName === "a" &&
            node.properties.href?.startsWith("http")
          ) {
            node.properties.target = "_blank"
            node.properties.rel = "noopener noreferrer"
          }
        })
      }
    })
    .use(rehypeSlug) // generate IDs for headingsgco
    .use(rehypeAutoLinkHeadings, {
      behavior: "wrap",
      properties: {
        ariaLabel: "Link to self",
        className: "anchor",
      },
    } as Options)
    .use(rehypeHighlight) // snytax highlighting
    .use(rehypeStringify)

  const result = await processor.process(markdown)
  return result.toString()
}
