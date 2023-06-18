import { truncateTitle } from "utils/blog-utils"

export const BlogTitle: React.FC<{ title: string }> = ({ title }) => {
  return <h2 className="text-3xl font-bold ">{truncateTitle(title)}</h2>
}
