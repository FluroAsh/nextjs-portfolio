// TODO: Retype these, they should be specific to posts as there's a different schema...
// Will have to retype above as-well, probably.
export interface IAttributes {
  slug: string
  title: string
  description: string
  cover: {
    data: {
      attributes: {
        url: string
        alternativeText: string
        formats: Formats
      }
    }
  }
  createdAt: string
  isFeatured?: boolean
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
