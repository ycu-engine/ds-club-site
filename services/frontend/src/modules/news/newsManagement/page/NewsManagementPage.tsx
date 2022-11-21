import { Container, Heading, Spinner, useToast } from '@chakra-ui/react'
import {
  NewsViewerFragment,
  NewsViewerFragmentDoc,
  useNewsManagementPageQuery,
} from 'generates/graphql'
import { filter } from 'graphql-anywhere'
import { useEffect } from 'react'
import { CreateNewsModal } from '../components/createNewsModal/CreateNewsModal'
import { NewsViewer } from '../components/newsViewer/NewsViewer'

export const NewsManagementPage = () => {
  const toast = useToast()
  const { data, loading, error } = useNewsManagementPageQuery({})
  useEffect(() => {
    if (error) {
      toast({
        duration: 3000,
        isClosable: true,
        status: 'error',
        title: error?.message,
      })
    }
  }, [error, toast])
  return (
    <Container>
      <Heading my="5">お知らせ管理ページ</Heading>

      {loading ? (
        <Spinner />
      ) : (
        <NewsViewer
          newsList={filter<NewsViewerFragment[]>(
            NewsViewerFragmentDoc,
            data?.getNewsList,
          )}
        />
      )}

      <CreateNewsModal />
    </Container>
  )
}
