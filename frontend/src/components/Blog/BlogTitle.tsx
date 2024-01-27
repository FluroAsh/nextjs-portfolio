const BlogTitle: React.FC<{ title: string }> = ({ title }) => (
  <h2 className="text-3xl font-bold truncate tracking-wide max-w-full sm:max-w-[500px] md:max-w-full text-balance">
    {title}
  </h2>
)

export default BlogTitle
