import { DefaultLayout } from 'components/Layout/DefaultLayout'
import { AdminOnlyLayout } from 'modules/userFilter/layouts/AdminOnlyLayout/AdminOnlyLayout'
import type { NextPage } from 'next'
import Head from 'next/head'

const Page: NextPage = () => {
  return (
    <DefaultLayout>
      <AdminOnlyLayout>
        <Head>
          <title>メンター・メンティー管理ページ</title>
        </Head>
      </AdminOnlyLayout>
    </DefaultLayout>
  )
}

export default Page
