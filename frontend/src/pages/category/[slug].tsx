import { useRouter } from "next/router"

import Layout from "components/layout"

function Category() {
  const router = useRouter()
  const { slug } = router.query

  return (
    <Layout type="blog">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div>Category - Under Construction</div>
        <h1 className="capitalize">{slug}</h1>
      </div>
    </Layout>
  )
}

export default Category
