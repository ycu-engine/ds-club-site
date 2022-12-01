import { DefaultLayout } from 'components/Layout/DefaultLayout'
import { MenteeListPage } from 'modules/menter/menteeList/Pages/MenteeListPage'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Page = () => {
  const router = useRouter()
  const userId = router.query['userID'] as string

  return (
    <DefaultLayout>
      <Head>
        <title>あなたのメンティー</title>
      </Head>

      <MenteeListPage userId={userId} />
    </DefaultLayout>
  )
}

export default Page
