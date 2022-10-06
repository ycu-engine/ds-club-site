import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { DefaultLayout } from '../../../components/DefaultLayout'
import { StudyLogPage } from '../../../modules/studyLog/pages/StudyLogPage'

const Page: NextPage = () => {
  const router = useRouter()
  const { userID: userId } = router.query
  if (typeof userId !== 'string') {
    return <DefaultLayout>無効なURLです</DefaultLayout>
  }
  return (
    <DefaultLayout>
      <StudyLogPage userId={userId} />
    </DefaultLayout>
  )
}
export default Page
