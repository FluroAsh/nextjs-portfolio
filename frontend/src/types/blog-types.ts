import type { Formats } from "./api-types"

export interface BlogImageProps {
  sourceUrl?: string
  alt: string
  placeholder?: string
  className?: string
  linkTo?: string
  featured?: boolean
  formats: Formats
}

export interface BlogPostProps {
  title: string
  slug: string
  content: string
  url: string
  createdAt: string
  alternativeText: string
  formats: Formats
  metaTags: MetaTagAttributes
}

export interface IconProps {
  className: string
  height?: string | number
}

// Mapped type required to keep "og" tags optional while preserving requirement
// for other properties with an intersection.
export type MetaTagAttributes = {
  [K in
    | "og:title"
    | "og:desription"
    | "og:image"
    | "og:url"
    | "og:type"]?: string
} & {
  [key: string]: string
}
