import { DefaultLayout } from '../../../components/Layout/DefaultLayout'
import { AdminOnly } from '../../../modules/admin/components/AdminOnly'
import { TrialManagementPage } from '../../../modules/admin/pages/trailManagement/pages/trialManagementPage'

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
