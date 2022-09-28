import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  Heading,
  Container,
  TabPanel,
  Text,
  Spinner,
  BoxProps,
} from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { useNewsQuery } from '../../generates/graphql'

type NewsProps = {
  children?: ReactNode
} & BoxProps
const NewsWrapper = ({ children, ...props }: NewsProps) => {
  return (
    <Container py="5" w="40vw">
      <Tabs
        border="1px solid black"
        borderRadius="20"
        colorScheme="green"
        isManual={false}
        p="5"
        variant="soft-rounded"
      >
        <Heading fontSize={['xl', '2xl', '3xl']}>お知らせ</Heading>

        <Box
          border="1px solid black"
          borderRadius="20"
          h="50vh"
          m={['2,', '5']}
          {...props}
        >
          {children}
        </Box>
      </Tabs>
    </Container>
  )
}

export const News = () => {
  const { data, loading } = useNewsQuery({
    variables: {},
  })

  if (loading) {
    return (
      <NewsWrapper alignItems="center" display="flex" justifyContent="center">
        <Spinner size="lg" />
      </NewsWrapper>
    )
  }

  if (!data || data.getNewsList.length === 0) {
    return (
      <NewsWrapper>
        <Heading fontSize="lg" p="5">
          現在お知らせはありません
        </Heading>
      </NewsWrapper>
    )
  }
  return (
    <NewsWrapper>
      <TabPanels h="50vh" overflow="scroll" p="5">
        {data?.getNewsList.map((news) => {
          console.info(news)
          return (
            <TabPanel key={news.title}>
              <Box>
                <Heading fontSize={['xl', '2xl', '3xl']}>{news.title}</Heading>

                <Text>{news.body}</Text>
              </Box>
            </TabPanel>
          )
        })}
      </TabPanels>

      <TabList justifyContent="center">
        {data.getNewsList.map((news) => {
          return (
            <Tab
              _focus={{ outline: 'none' }}
              _selected={{ bg: 'blackAlpha.200', color: 'red' }}
              key={news.title}
            >
              ・
            </Tab>
          )
        })}
      </TabList>
    </NewsWrapper>
  )
}

export default News
