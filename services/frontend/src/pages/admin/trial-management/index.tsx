import { DefaultLayout } from '../../../components/Layout/DefaultLayout'
import { AdminOnly } from '../../../modules/userFilter/AdminOnly/AdminOnly'
import { TrialManagementPage } from '../../../modules/admin/trailManagement/pages/trialManagementPage'

const Page = () => {
  return (
    <AdminOnly>
      <DefaultLayout>
        <TrialManagementPage />
      </DefaultLayout>
    </AdminOnly>
  )
}

export default Page
