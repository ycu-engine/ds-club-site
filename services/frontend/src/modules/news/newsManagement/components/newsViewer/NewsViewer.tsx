import {
  Box,
  FormLabel,
  Select,
  Text,
  Textarea,
  Input,
  VStack,
  useBoolean,
  IconButton,
  Tooltip,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import {
  NewsViewerFragment,
  UpdateNewsInput,
  useNewsViewer_UpdateNewsMutation,
} from 'generates/graphql'
import { CheckCircleIcon, EditIcon } from '@chakra-ui/icons'
import { SubmitHandler, useForm } from 'react-hook-form'

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
    if (news) {
      setSelectedNews(news)
      setValue('title', news.title)
      setValue('body', news.body)
    } else {
      setSelectedNews(null)
      reset()
    }
  }
  const [isEditabled, setIsEditabled] = useBoolean(false)
  const toast = useToast()
  const [newsViewerUpdateNewsMutation, { loading }] =
    useNewsViewer_UpdateNewsMutation({})
  const { register, setValue, handleSubmit, reset } = useForm<UpdateNewsInput>()
  const onSubmit: SubmitHandler<UpdateNewsInput> = async (form) => {
    const updatedNews = await newsViewerUpdateNewsMutation({
      onCompleted: () => {
        toast({
          duration: 3000,
          isClosable: true,
          status: 'success',
          title: 'お知らせを更新しました',
        })
      },

      onError: (error) => {
        toast({
          duration: 3000,
          isClosable: true,
          status: 'error',
          title: error?.message,
        })
        console.error(error)
      },
      variables: {
        id: selectedNews?.id || '',
        input: form,
      },
    })
    setSelectedNews(updatedNews.data?.updateNews || null)
    setIsEditabled.off()
  }

  const handleClickEditButton = () => {
    setIsEditabled.toggle()
    setValue('body', selectedNews?.body || '')
    setValue('title', selectedNews?.title || '')
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
          as="form"
          bg="white"
          borderRadius="md"
          boxShadow="md"
          justify="flex-start"
          my="4"
          position="relative"
          px="8"
          py="4"
          spacing="4"
        >
          <Tooltip label={isEditabled ? '編集を終了' : '編集'}>
            <IconButton
              aria-label="編集"
              colorScheme={isEditabled ? 'blue' : 'gray'}
              disabled={loading}
              float="right"
              icon={<EditIcon />}
              onClick={handleClickEditButton}
              position="absolute"
              right="4"
            />
          </Tooltip>

          {isEditabled ? (
            <Tooltip label="変更を反映する">
              <IconButton
                aria-label="確定"
                colorScheme="green"
                float="right"
                icon={<CheckCircleIcon />}
                isLoading={loading}
                onClick={handleSubmit(onSubmit)}
                position="absolute"
                right="4"
                top="14"
              />
            </Tooltip>
          ) : null}

          <Box>
            <FormLabel fontWeight="semibold">タイトル</FormLabel>

            <Input
              disabled={loading}
              isReadOnly={!isEditabled}
              {...register('title', { minLength: 1 })}
            />
          </Box>

          <Box>
            <FormLabel fontWeight="semibold">本文</FormLabel>

            <Textarea
              disabled={loading}
              isReadOnly={!isEditabled}
              size="lg"
              {...register('body', { minLength: 1 })}
            />
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
