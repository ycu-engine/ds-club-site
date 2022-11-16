import { DefaultLayout } from 'components/Layout/DefaultLayout'
import { MyPage } from 'modules/user/pages/MyPage'
import { AdminOrLoginOnlyLayout } from 'modules/userFilter/layouts/AdminOrLoginOnlyLayout/AdminOrLoginOnlyLayout'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Page: NextPage = () => {
  const router = useRouter()
  const { userID: userId } = router.query

  if (typeof userId !== 'string') {
    return <DefaultLayout>無効なURLです</DefaultLayout>
  }
  return (
    <AdminOrLoginOnlyLayout userId={userId}>
      <DefaultLayout>
        <MyPage userId={userId} />
      </DefaultLayout>
    </AdminOrLoginOnlyLayout>
  )
}

export default Page
