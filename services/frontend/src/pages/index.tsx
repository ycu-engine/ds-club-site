import { Center, Flex, Spinner } from '@chakra-ui/react'
import { DefaultLayout } from '../components/DefaultLayout'
import dynamic from 'next/dynamic'
import type { SchedulerProps } from '../modules/scheduler/Scheduler'
import { NewsTab } from '../modules/newsTab/NewsTab'
import {
  HomeDocument,
  NewsTabFragment,
  NewsTabFragmentDoc,
  SchedulerFragment,
  SchedulerFragmentDoc,
  useHomeQuery,
} from '../generates/graphql'
import { filter } from 'graphql-anywhere'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../clients/firebase'
import { Loading } from '../components/Loading'
import TopLogo from '../assets/images/topPage/top_logo.png'
import { FadeInImage } from '../components/Image/FadeInImage'

// https://nextjs.org/docs/advanced-features/dynamic-import#example
// react18なので、Suspenseを使うことが推奨されているがエラーが出るので、loadingを使う
const Scheduler = dynamic<SchedulerProps>(
  () => import('../modules/scheduler/Scheduler').then((mod) => mod.Scheduler),
  {
    loading: () => (
      <Center h="60vh">
        <Spinner size="lg" />
      </Center>
    ),

    ssr: false,
  },
)

const HomePage = () => {
  const [user, authLoading] = useAuthState(auth)
  const { data, loading: queryLoading } = useHomeQuery({
    skip: !user,
    variables: {
      userId: user?.uid || '',
    },
  })
  if (authLoading || queryLoading) {
    console.info(authLoading, queryLoading)
    return <Loading />
  }
  if (!user) {
    return <DefaultLayout />
  }
  if (!data) {
    return <DefaultLayout />
  }
  const newsList = data?.getNewsList

  return (
    <DefaultLayout>
      <FadeInImage src={TopLogo} />

      <Flex direction={['column', 'row']} justifyContent="space-between" p={5}>
        <NewsTab
          isLoading={authLoading || queryLoading}
          newsList={filter<NewsTabFragment[]>(NewsTabFragmentDoc, newsList)}
        />

        <Scheduler
          isLoading={authLoading || queryLoading}
          refetchQueryDoc={HomeDocument}
          schedulerData={filter<SchedulerFragment>(SchedulerFragmentDoc, data)}
        />
      </Flex>
    </DefaultLayout>
  )
}

export default HomePage
