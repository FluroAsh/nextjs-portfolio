import Link from "next/link"

export const CategoryTag: React.FC<{ name: string; slug: string }> = ({
  name,
  slug,
}) => (
  <Link href={`/category/${slug}`}>
    <div className="font-semibold tracking-wide uppercase transition-opacity hover:opacity-80">
      {name}
    </div>
  </Link>
)
