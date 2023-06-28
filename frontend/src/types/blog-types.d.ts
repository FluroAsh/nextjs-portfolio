import type {
  APICategories,
  FormatProps,
  Formats,
  PostAttributes,
} from "./api-types"

/** COMPONENT TYPES */
export interface BlogProps {
  posts: PostData[]
  featuredPost: PostData[]
}

export interface BlogImageProps {
  sourceUrl?: string
  alt: string
  placeholder?: string
  className?: string
  linkTo?: string
  featured?: boolean
  formats: Formats
}

export interface BlogFeatureProps {
  id?: string
  attributes: PostAttributes
  categoryData: CategoryAttributes[]
}

export interface BlogPreviewProps {
  id?: string
  attributes: PostAttributes
  categoryData: CategoryAttributes[]
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

/** DATA TYPES */
export interface PostData {
  id: string
  attributes: PostAttributes
  categories: CategoryData
}

export type CategoryData = { data: CategoryAttributes[] }

export interface CategoryAttributes {
  attributes: {
    name: string
    slug: string
    description: string
  }
}
