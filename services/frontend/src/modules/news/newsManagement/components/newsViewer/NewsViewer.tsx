import {
  Box,
  FormLabel,
  Select,
  Text,
  Textarea,
  Input,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import type { NewsViewerFragment } from 'generates/graphql'

type NewsSelecterProps = {
  newsList: NewsViewerFragment[]
  setNewsById: (newsId: string) => void
}
export const NewsSelecter = ({ newsList, setNewsById }: NewsSelecterProps) => {
  return (
    <Box w="50%">
      <FormLabel fontWeight="semibold">選択したお知らせ</FormLabel>

      <Select
        bg="gray.300"
        onChange={(e) => setNewsById(e.target.value)}
        placeholder="お知らせを選択"
      >
        {newsList.map((news) => (
          <option key={news.id} value={news.id}>
            {news.title}
          </option>
        ))}
      </Select>
    </Box>
  )
}

type NewsViewerProps = {
  newsList: NewsViewerFragment[]
}
export const NewsViewer = ({ newsList }: NewsViewerProps) => {
  const [selectedNews, setSelectedNews] = useState<NewsViewerFragment | null>(
    null,
  )
  const setNewsById = (newsId: string) => {
    const news = newsList.find((_news) => _news.id === newsId)
    setSelectedNews(news || null)
  }

  if (newsList.length === 0) {
    return <>お知らせがありません</>
  }

  return (
    <>
      <NewsSelecter newsList={newsList} setNewsById={setNewsById} />

      {selectedNews ? (
        <VStack
          align="flex-start"
          bg="white"
          borderRadius="md"
          boxShadow="md"
          justify="flex-start"
          my="4"
          p="4"
          spacing="4"
        >
          <Box>
            <FormLabel fontWeight="semibold">タイトル</FormLabel>

            <Input isReadOnly value={selectedNews.title} />
          </Box>

          <Box>
            <FormLabel fontWeight="semibold">本文</FormLabel>

            <Textarea isReadOnly value={selectedNews.body} />
          </Box>

          <Box>
            <FormLabel fontWeight="semibold">作成日時</FormLabel>

            <Text>{selectedNews.createdAt}</Text>
          </Box>

          <Box>
            <FormLabel fontWeight="semibold">更新日時</FormLabel>

            <Text>{selectedNews.updatedAt}</Text>
          </Box>
        </VStack>
      ) : (
        <Box my={4}>何も選択されていません</Box>
      )}
    </>
  )
}
