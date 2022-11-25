import { Heading } from '@chakra-ui/react'
import { DefaultLayout } from 'components/Layout/DefaultLayout'
import { MenterManagementPage } from 'modules/menter/menterManagement/MenterManagementPage'
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

        <Heading>メンター・メンティー管理ページ</Heading>

        <MenterManagementPage />
      </AdminOnlyLayout>
    </DefaultLayout>
  )
}

export default Page
