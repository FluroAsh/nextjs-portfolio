import { useEffect, useState } from "react"

import useMediaQuery from "hooks/useMediaQuery"

import { cn } from "lib/utils"

import { HeadingLink } from "./HeadingLink"

export type Heading = {
  id: string
  text: string
  level: number
}

export const TableOfContents = () => {
  const [headings, setHeadings] = useState<Heading[] | []>([])

  const isVisible = useMediaQuery("(min-width: 1536px)")

  useEffect(() => {
    const article = document.querySelector<HTMLElement>("article")

    if (article) {
      const elements: Heading[] = Array.from(
        article.querySelectorAll("h2, h3")
      ).map((element) => ({
        id: element.id,
        text: element.textContent as string,
        level: Number(element.nodeName.charAt(1)), // h(2), h(3), etc.
      }))
      setHeadings(elements)
    }
  }, [])

  if (headings.length < 3) return null

  return (
    <nav
      aria-hidden={!isVisible}
      className={cn(
        "hidden lg:block sticky top-14 right-0 h-fit p-5 w-[250px]"
      )}
    >
      <span className="text-xl font-bold tracking-wide">Table of Contents</span>
      <ul className="pt-2 max-w-full ">
        {headings.map(({ id, text, level }: Heading) => (
          <HeadingLink key={id} id={id} text={text} level={level} />
        ))}
      </ul>
    </nav>
  )
}
