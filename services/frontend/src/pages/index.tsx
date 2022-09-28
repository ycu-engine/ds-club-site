import { Container, Flex, Spinner } from '@chakra-ui/react'
import { DefaultLayout } from '../components/DefaultLayout'
import dynamic from 'next/dynamic'
import type { SchedulerProps } from '../modules/scheduler/Scheduler'
import { NewsTab } from '../modules/newsTab/NewsTab'
import {
  NewsTabFragment,
  NewsTabFragmentDoc,
  useHomeQuery,
} from '../generates/graphql'
import { filter } from 'graphql-anywhere'

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
  const { data, loading } = useHomeQuery()
  const newsList = data?.getNewsList

  return (
    <DefaultLayout authenticated={false}>
      <Flex direction={['column', 'row']} justifyContent="space-between" p={5}>
        <NewsTab
          loading={loading}
          newsList={filter<NewsTabFragment[]>(NewsTabFragmentDoc, newsList)}
        />

        <Scheduler />
      </Flex>
    </DefaultLayout>
  )
}

export default HomePage
