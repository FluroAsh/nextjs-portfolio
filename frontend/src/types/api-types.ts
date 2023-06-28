// TODO: Retype these, they should be specific to posts as there's a different schema...

import { CategoryData } from "./blog-types"

export interface PostAttributes {
  slug: string
  title: string
  description: string
  categories: CategoryData
  cover: APICover
  createdAt: string
  isFeatured: boolean
}

export interface APICover {
  data: {
    attributes: {
      url: string
      alternativeText: string
      formats: Formats
    }
  }
}

export interface CategoryAttributes {
  slug: string
  name: string
  description: string
}
export interface APICategories {
  data: {
    id: string
    attributes: CategoryAttributes
  }[]
}

export interface APICategory {
  id: string
  attributes: {
    slug: string
    name: string
    description: string
  }
}

type ImageExtensions = "jpg" | "png" | "webp" | "gif" | "avif"
type ImageMimes =
  | "image/jpeg"
  | "image/png"
  | "image/webp"
  | "image/gif"
  | "image/avif"

export enum formatName {
  LARGE = "large",
  MEDIUM = "medium",
  SMALL = "small",
  THUMBNAIL = "thumbnail",
}

// Mapped type, as we can't achieve this with an interface
export type Formats = {
  [property in formatName]: FormatProps
}

export type FormatProps = {
  name: string
  hash: string
  ext: ImageExtensions
  mime: ImageMimes
  width: number
  height: number
  size: number
  url: string
}
