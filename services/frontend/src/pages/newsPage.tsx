import React from 'react'
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Flex,
  Text,
  Container,
  Wrap,
} from '@chakra-ui/react'
import { DefaultLayout } from '../components/DefaultLayout'

// タブ用のprops
const tabprops: {} = {
  _selected: { bg: 'blackAlpha.200', color: 'red' },
  _focus: { outline: 'none' },
}

const Page = () => {
  return (
    <DefaultLayout>
      {/* お知らせ */}
      <Wrap>
        <Container>
          <Box w={['initial', '50vw']} py="5">
            <Tabs
              p="5"
              variant="soft-rounded"
              colorScheme="green"
              border="1px solid black"
              borderRadius="20"
              isManual={false}
            >
              <Heading fontSize={['xl', '2xl', '3xl']}>お知らせ</Heading>
              <Box m={['2,', '5']} border="1px solid black" borderRadius="20">
                <TabPanels p="5" h="50vh" overflow="scroll">
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
        <Container></Container>
      </Wrap>
    </DefaultLayout>
  )
}

export default Page
