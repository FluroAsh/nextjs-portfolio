import Layout from "Layouts/layout"

export const NoContent = ({
  text = "🚨 We couldn't find any content for this page! 💀",
}: {
  text?: string
}) => (
  <Layout title="Woops! 😱 No content!">
    <div className="flex flex-col justify-center items-center flex-1">
      <h1 className="text-2xl dark:text-white text-neutral-700 font-semibold">
        {text}
      </h1>
      <p className="leading-8 dark:text-neutral-300 text-neutral-600">
        Get in touch with Ash and tell him to write something!
      </p>
    </div>
  </Layout>
)
