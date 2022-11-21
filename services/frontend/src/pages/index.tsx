import { Center, Flex, Spinner, useToast } from '@chakra-ui/react'
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
import Head from 'next/head'
import { FadeInImage } from 'components/Image/FadeInImage'

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
      <Head>
        <title>データサイエンス倶楽部公式サイト</title>

        <meta
          content="データサイエンス倶楽部の公式サイトです。"
          name="description"
        />

        <meta content="データサイエンス倶楽部公式サイト" property="og:title" />

        <meta
          content="データサイエンス倶楽部の公式サイトです。"
          property="og:description"
        />

        <meta content="https://datascience-club.jp/" property="og:url" />

        <meta content="/images/logo_dsci.png" property="og:image" />

        <meta
          content="データサイエンス倶楽部公式サイト"
          property="og:site_name"
        />

        <meta content="website" property="og:type" />
      </Head>

      <FadeInImage alt="logo" src="/images/logo_dsci.png" />

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
