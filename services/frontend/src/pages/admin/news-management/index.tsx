import { DefaultLayout } from 'components/Layout/DefaultLayout'
import { NewsManagementPage } from 'modules/news/newsManagement/page/NewsManagementPage'
import { AdminOnlyLayout } from 'modules/userFilter/layouts/AdminOnlyLayout/AdminOnlyLayout'
import type { NextPage } from 'next'
import Head from 'next/head'

const Page: NextPage = () => {
  return (
    <DefaultLayout>
      <AdminOnlyLayout>
        <Head>
          <title>お知らせ管理ページ</title>
        </Head>

        <NewsManagementPage />
      </AdminOnlyLayout>
    </DefaultLayout>
  )
}

export default Page
