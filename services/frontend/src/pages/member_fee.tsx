import { DefaultLayout } from '../components/DefaultLayout'
import Image from 'next/image'
import Pay from '../assets/images/pay.jpg'
import {
  Text,
  Box,
  Heading,
  Flex,
  OrderedList,
  ListItem,
} from '@chakra-ui/react'

const Page = () => {
  return (
    <DefaultLayout>
      <Flex direction={{ base: 'column', md: 'row' }} gap={5} padding={10}>
        <Box background="#fff" borderRadius="3xl" flex={2} p={5}>
          <Heading textAlign="center">支払い状況</Heading>

          <Image src={Pay} />
        </Box>

        <Flex direction="column" flex={1} justify="left" padding={10}>
          <Box
            background="#fff"
            borderRadius="3xl"
            flex={1}
            margin={5}
            mx="auto"
            p={5}
          >
            <Text color="pink.500" fontSize="3xl" textAlign="center">
              名前：
              <Text as="span" color="#000">
                浦優太
              </Text>
            </Text>

            <Text color="pink.500" fontSize="3xl" textAlign="center">
              会員：
              <Text as="span" color="#000">
                一般会員
              </Text>
            </Text>
          </Box>

          <Box
            background="#fff"
            borderRadius="3xl"
            flex={1}
            mx="auto"
            p={5}
            padding={10}
          >
            <Text fontSize="2xl" textAlign="left">
              &emsp;会費についての注意事項
            </Text>

            <OrderedList fontSize="2xl" textAlign="left">
              <ListItem>会費の徴収は4月と10月に行います</ListItem>

              <ListItem>徴収金額は3000円です</ListItem>

              <ListItem>
                脱退される場合、月割り計算で差額を返金致します
              </ListItem>

              <ListItem>
                会費を期限内に納めていただけない場合、除名処分及び在籍期間中の会費を請求します
              </ListItem>
            </OrderedList>
          </Box>

          <Text>支払いはこちらから</Text>
        </Flex>
      </Flex>
    </DefaultLayout>
  )
}

export default Page
