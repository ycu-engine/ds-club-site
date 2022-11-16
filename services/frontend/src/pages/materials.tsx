import Head from 'next/head'
import { DefaultLayout } from '../components/Layout/DefaultLayout'
import { MaterialsPage } from '../modules/materials/page/MaterialsPage'

const Page = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>教材一覧ページ</title>
      </Head>

      <MaterialsPage />
    </DefaultLayout>
  )
}

export default Page
