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
  description: string
  content: string
  url: string
  createdAt: string
  alternativeText: string
  formats: Formats
}
