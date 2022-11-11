import { AdminOnlyLayout } from '../../../modules/userFilter/layouts/AdminOnlyLayout/AdminOnlyLayout'
import { MemberInfoPage } from '../../../modules/admin/MemberInfo/MemberInfoPage'

const Page = () => {
  return (
    <AdminOnlyLayout>
      <MemberInfoPage />
    </AdminOnlyLayout>
  )
}
export default Page
