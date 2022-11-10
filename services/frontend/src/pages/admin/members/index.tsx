import { AdminOnly } from '../../../modules/admin/components/AdminOnly'
import { MemberInfoPage } from '../../../modules/admin/pages/MemberInfoPage'

const Page = () => {
  return (
    <AdminOnly>
      <MemberInfoPage />
    </AdminOnly>
  )
}
export default Page
