import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../clients/firebase'
import { DefaultLayout } from '../components/DefaultLayout'
import { MenteeListPage } from '../modules/menteeList/Pages/MenteeListPage'

const Page = () => {
  const [user, _loading] = useAuthState(auth)

  if (!user) {
    return <DefaultLayout />
  }
  return (
    <DefaultLayout>
      {/* 将来的はクエリからuserのIdを取得したい */}

      <MenteeListPage userId={user.uid} />
    </DefaultLayout>
  )
}

export default Page
