import Layout from "Layouts/layout"

export default function NoContent({
  text = "🚨  We couldn't find any content for this page! 💀",
}: {
  text: string
}) {
  return (
    <Layout title="Woops! 😱 No content!">
      <div className="flex justify-center items-center flex-1">
        <h1 className="text-2xl">{text}</h1>
      </div>
    </Layout>
  )
}
