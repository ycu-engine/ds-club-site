import React from 'react'
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Text,
  Container,
  Wrap,
} from '@chakra-ui/react'
import { DefaultLayout } from '../components/DefaultLayout'

// タブ用のprops
const tabprops: {} = {
  _focus: { outline: 'none' },
  _selected: { bg: 'blackAlpha.200', color: 'red' },
}

const Page = () => {
  return (
    <DefaultLayout>
      {/* お知らせ */}

      <Wrap>
        <Container>
          <Box py="5" w={['initial', '50vw']}>
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

                  <TabPanel>
                    <Box>
                      <Heading fontSize={['xl', '2xl', '3xl']}>
                        定例会のお知らせ
                      </Heading>

                      <Text>今日やります！みんな来てねー</Text>
                    </Box>
                  </TabPanel>

                  <TabPanel>
                    <Box>
                      <Heading fontSize={['2xl', '3xl', '4xl']}>
                        パーティーのお知らせ
                      </Heading>

                      <Text>うえーい</Text>
                    </Box>
                  </TabPanel>

                  <TabPanel>
                    <Box>
                      <Heading fontSize={['2xl', '3xl', '4xl']}>
                        テストのお知らせ
                      </Heading>

                      <Text>勉強しましょう</Text>
                    </Box>
                  </TabPanel>
                </TabPanels>
              </Box>

              <TabList justifyContent="center">
                <Tab {...tabprops}>・</Tab>

                <Tab {...tabprops}>・</Tab>

                <Tab {...tabprops}>・</Tab>
              </TabList>
            </Tabs>
          </Box>
        </Container>

        {/* カレンダー */}

        <Container />
      </Wrap>
    </DefaultLayout>
  )
}

export default Page
