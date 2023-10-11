import { truncateTitle } from "lib/utils"

const BlogTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <h2 className="text-3xl font-bold tracking-wide">{truncateTitle(title)}</h2>
  )
}

export default BlogTitle
