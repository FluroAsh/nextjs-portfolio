import type { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"

import Layout from "components/layout"

export interface CategoryProps {
  slug: string
}

const Category: React.FC<CategoryProps> = () => {
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

// TODO: Fetch posts by Category & their slugs for static paths
const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}
