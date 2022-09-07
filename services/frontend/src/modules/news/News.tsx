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
} from '@chakra-ui/react'
import { useNewsQuery } from '../../generates/graphql'

export const News = () => {
  const { data, loading, error } = useNewsQuery({
    variables: {},
  })
  console.info(data, loading, error)
  if (!data) {
    return null
  }
  return (
    <Container py="5">
      <Tabs
        border="1px solid black"
        borderRadius="20"
        colorScheme="green"
        isManual={false}
        p="5"
        variant="soft-rounded"
      >
        <Heading fontSize={['xl', '2xl', '3xl']}>お知らせ</Heading>

        <Box border="1px solid black" borderRadius="20" m={['2,', '5']}>
          <TabPanels h="50vh" overflow="scroll" p="5">
            {/* TabPanelにお知らせを追加する */}

            {data.getNews.map((news) => {
              console.info(news)
              return (
                <TabPanel key={news.title}>
                  <Box>
                    <Heading fontSize={['xl', '2xl', '3xl']}>
                      {news.title}
                    </Heading>

                    <Text>{news.body}</Text>
                  </Box>
                </TabPanel>
              )
            })}
          </TabPanels>
        </Box>

        <TabList justifyContent="center">
          {data.getNews.map((news) => {
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
      </Tabs>
    </Container>
  )
}

export default News
