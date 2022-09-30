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
import type { NewsTabFragment } from '../../generates/graphql'

type NewsTabWrapperProps = {
  children?: ReactNode
} & BoxProps
const NewsTabWrapper = ({ children, ...props }: NewsTabWrapperProps) => {
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

type NewsTabProps = {
  newsList?: NewsTabFragment[]
  loading: boolean
}
export const NewsTab = ({ newsList, loading }: NewsTabProps) => {
  if (loading) {
    return (
      <NewsTabWrapper
        alignItems="center"
        display="flex"
        justifyContent="center"
      >
        <Spinner size="lg" />
      </NewsTabWrapper>
    )
  }

  if (!newsList || newsList.length === 0) {
    return (
      <NewsTabWrapper>
        <Heading fontSize="lg" p="5">
          現在お知らせはありません
        </Heading>
      </NewsTabWrapper>
    )
  }
  return (
    <NewsTabWrapper>
      <TabPanels h="50vh" overflow="scroll" p="5">
        {newsList.map((news) => {
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
        {newsList.map((news) => {
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
    </NewsTabWrapper>
  )
}

export default NewsTab
