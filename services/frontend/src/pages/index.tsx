import { Container, Flex, Spinner } from '@chakra-ui/react'
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

// https://nextjs.org/docs/advanced-features/dynamic-import#example
// react18なので、Suspenseを使うことが推奨されているがエラーが出るので、loadingを使う
const Scheduler = dynamic<SchedulerProps>(
  () => import('../modules/scheduler/Scheduler').then((mod) => mod.Scheduler),
  {
    loading: () => (
      <Container
        alignItems="center"
        display="flex"
        h="60vh"
        justifyContent="center"
      >
        <Spinner size="lg" />
      </Container>
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
