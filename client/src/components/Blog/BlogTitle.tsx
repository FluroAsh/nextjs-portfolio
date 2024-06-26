import { cn } from "lib/utils"

const BlogTitle: React.FC<{ title: string; className?: string }> = ({
  title,
  className: extraStyles,
}) => (
  <h2 className={cn("text-3xl font-bold truncate tracking-wide", extraStyles)}>
    {title}
  </h2>
)

export default BlogTitle
