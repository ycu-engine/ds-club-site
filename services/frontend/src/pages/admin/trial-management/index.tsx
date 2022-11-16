import { DefaultLayout } from '../../../components/Layout/DefaultLayout'
import { AdminOnlyLayout } from '../../../modules/userFilter/layouts/AdminOnlyLayout/AdminOnlyLayout'
import { TrialManagementPage } from '../../../modules/admin/trailManagement/pages/trialManagementPage'

const Page = () => {
  return (
    <AdminOnlyLayout>
      <DefaultLayout>
        <TrialManagementPage />
      </DefaultLayout>
    </AdminOnlyLayout>
  )
}

export default Page
