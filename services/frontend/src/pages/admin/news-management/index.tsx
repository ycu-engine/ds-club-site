import { DefaultLayout } from 'components/Layout/DefaultLayout'
import { NewsManagementPage } from 'modules/news/newsManagement/page/NewsManagementPage'
import { AdminOnlyLayout } from 'modules/userFilter/layouts/AdminOnlyLayout/AdminOnlyLayout'
import type { NextPage } from 'next'

const Page: NextPage = () => {
  return (
    <DefaultLayout>
      <AdminOnlyLayout>
        <NewsManagementPage />
      </AdminOnlyLayout>
    </DefaultLayout>
  )
}

export default Page
