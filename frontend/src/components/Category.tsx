import Link from "next/link"

export const Category: React.FC<{
  name: string
  slug: string
}> = ({ name, slug }) => {
  return (
    <Link href={`/category/${slug}`}>
      <div className="font-semibold uppercase">{name}</div>
    </Link>
  )
}
