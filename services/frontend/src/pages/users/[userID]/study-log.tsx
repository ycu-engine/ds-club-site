import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { DefaultLayout } from '../../../components/Layout/DefaultLayout'
import { StudyLogPage } from '../../../modules/studyLog/pages/StudyLogPage'

const Page: NextPage = () => {
  const router = useRouter()
  const { userID: userId } = router.query
  if (typeof userId !== 'string') {
    return <DefaultLayout>無効なURLです</DefaultLayout>
  }
  return (
    <DefaultLayout>
      <Head>
        <title>学習記録ページ</title>
      </Head>

      <StudyLogPage userId={userId} />
    </DefaultLayout>
  )
}
export default Page
