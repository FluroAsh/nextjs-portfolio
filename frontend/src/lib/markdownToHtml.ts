import rehypeAutoLinkHeadings, { type Options } from "rehype-autolink-headings"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"

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
    .use(rehypeSlug) // generate IDs for headings
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
