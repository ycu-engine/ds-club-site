import { AdminOnly } from '../../../modules/userFilter/AdminOnly/AdminOnly'
import { MemberInfoPage } from '../../../modules/admin/MemberInfo/MemberInfoPage'

const Page = () => {
  return (
    <AdminOnly>
      <MemberInfoPage />
    </AdminOnly>
  )
}
export default Page
