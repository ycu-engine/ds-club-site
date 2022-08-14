import { useEffect } from 'react'
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  Heading,
  Container,
  Wrap,
  TabPanel,
  Text,
} from '@chakra-ui/react'
import { DefaultLayout } from '../../../components/DefaultLayout'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../clients/firebase'

type NewsType = {
  title: string
  body: string
}
const sampleNews: NewsType[] = [
  { body: 'fugafuga1', title: 'hogehoge1' },
  { body: 'fugafuga2', title: 'hogehoge2' },
  { body: 'fugafuga3', title: 'hogehoge3' },
]

const NewsPage = () => {
  const [user] = useAuthState(auth)

  useEffect(() => {
    if (user) {
      void user.getIdToken(true).then((Token) => {
        console.debug(Token)
      })
    }
  }, [user])

  return (
    <DefaultLayout>
      {/* お知らせ */}

      <Wrap>
        <Container py="5" w={['initial', '50vw']}>
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

                {sampleNews.map((news: NewsType) => {
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
              {sampleNews.map((news: NewsType) => {
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

        {/* カレンダー */}

        <Container />
      </Wrap>
    </DefaultLayout>
  )
}

export default NewsPage
