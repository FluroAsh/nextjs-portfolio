import { truncate } from "lib/utils"

const BlogTitle: React.FC<{ title: string }> = ({ title }) => (
  <h2 className="text-3xl font-bold tracking-wide">{truncate(title)}</h2>
)

export default BlogTitle
