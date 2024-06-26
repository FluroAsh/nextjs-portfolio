export const ROUTE_URL = {
  HOME: "/",
  BLOG: "/blog",
  PAGE: "/page",
  CATEGORY: "/categories",
} as const

export const getSlugPath = (type: "blog" | "category", slug: string) =>
  type === "blog"
    ? `${ROUTE_URL.BLOG}/${slug}`
    : `${ROUTE_URL.CATEGORY}/${slug}`
