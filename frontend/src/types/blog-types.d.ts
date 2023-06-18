import type {
  APICategories,
  FormatProps,
  Formats,
  PostAttributes,
} from "./api-types"

/** COMPONENT TYPES */
export interface BlogProps {
  posts: PostData[]
  featuredPost: BlogFeatureProps
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
}

export interface BlogPreviewProps {
  attributes: PostAttributes
  categories: CategoryAttributes[]
}

export interface PostProps {
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

export interface CategoryData {
  data: [attributes: CategoryAttributes]
}

export interface CategoryAttributes {
  attributes: {
    name: string
    slug: string
    description: string
  }
}
