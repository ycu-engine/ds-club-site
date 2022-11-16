import type { NextPage } from 'next'
import Head from 'next/head'
import { SubmitTrialApplicationPage } from '../modules/trialApplication/pages/SubmitTrialApplicationPage'

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>体験入会申し込みページ</title>
      </Head>

      <SubmitTrialApplicationPage />
    </>
  )
}
export default Page
