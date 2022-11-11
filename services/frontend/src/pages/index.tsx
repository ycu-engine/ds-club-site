import { Container, Flex, Spinner, useToast } from '@chakra-ui/react'
import { DefaultLayout } from '../components/Layout/DefaultLayout'
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
import { Loading } from '../components/Layout/Loading'

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
  const toast = useToast()
  const { data, loading, error } = useHomeQuery({})
  if (loading) {
    return <Loading />
  }
  if (error) {
    toast({
      description: error.message,
      duration: 5000,
      isClosable: true,
      status: 'error',
      title: 'エラー',
    })
    return <Loading loadingText="エラーが発生しました" />
  }

  if (!data) {
    return <DefaultLayout />
  }
  const newsList = data?.getNewsList

  return (
    <DefaultLayout>
      <Flex direction={['column', 'row']} justifyContent="space-between" p={5}>
        <NewsTab
          isLoading={loading}
          newsList={filter<NewsTabFragment[]>(NewsTabFragmentDoc, newsList)}
        />

        <Scheduler
          isLoading={loading}
          refetchQueryDoc={HomeDocument}
          schedulerData={filter<SchedulerFragment>(SchedulerFragmentDoc, data)}
        />
      </Flex>
    </DefaultLayout>
  )
}

export default HomePage
