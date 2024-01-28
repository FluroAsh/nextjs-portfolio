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
        "fixed top-20 right-4 pointer-events-none opacity-0 px-2 transition-opacity duration-250 ease-in-out z-50",
        "2xl:block max-w-[250px] 2xl:opacity-100 2xl:pointer-events-auto"
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
