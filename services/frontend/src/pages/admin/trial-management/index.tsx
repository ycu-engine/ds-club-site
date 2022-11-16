import { DefaultLayout } from '../../../components/Layout/DefaultLayout'
import { AdminOnlyLayout } from '../../../modules/userFilter/layouts/AdminOnlyLayout/AdminOnlyLayout'
import { TrialManagementPage } from '../../../modules/admin/trailManagement/pages/trialManagementPage'
import Head from 'next/head'

const Page = () => {
  return (
    <AdminOnlyLayout>
      <DefaultLayout>
        <Head>
          <title>体験入会管理ページ</title>
        </Head>

        <TrialManagementPage />
      </DefaultLayout>
    </AdminOnlyLayout>
  )
}

export default Page
