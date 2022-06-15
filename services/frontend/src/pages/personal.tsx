import { DefaultLayout } from '../components/DefaultLayout'
import { Box, Flex, Text } from '@chakra-ui/react'

import Image from 'next/image'
import Rank from '../assets/images/eva.png'
const br = '3xl'
const ranktext = '5xl'
const bigwidth = 550
const pink = '#D9376E'

const Page = () => {
  return (
    <DefaultLayout>
      {/* 外側 */}
      <Box px={10} py={10} pt={10} pb={10}>
        {/* 一列目 */}
        <Flex
          justify="space-around"
          align="stretch"
          direction={{ base: 'column-reverse', md: 'row' }}
        >
          {/* 左の要素について */}
          <Box bg="#FFFFFE" h={325} borderRadius={br}>
            <Flex align="center" direction="column" justify="space-around">
              <Flex>
                <Text fontSize={ranktext} color={pink}>
                  段位:
                </Text>
                <Text fontSize={ranktext}>エヴァンジェリスト</Text>
              </Flex>

              <Box h={200} mt={6} bg="#FF8E3C">
                <Image src={Rank} />
              </Box>
            </Flex>
          </Box>

          {/* 右の要素について */}
          <Box bg="#FFFFFE" ml={5} borderRadius={br}>
            <Flex align="center">
              <Flex direction="column" align="center">
                <Text color={pink}>名前：</Text>
                <Text color={pink}>会員：</Text>
              </Flex>
              <Flex direction="column" align="center">
                <Text></Text>
                <Text></Text>
              </Flex>
            </Flex>
          </Box>
        </Flex>

        {/* 二列目 */}
        <Flex justify="space-around" align="center" mt={8}>
          <Box bg="#0D0D0D" minW={bigwidth} minH={200} borderRadius={br}></Box>

          <Box bg="#FFFFFE" h={200} ml={5} borderRadius={br}></Box>
        </Flex>
      </Box>
    </DefaultLayout>
  )
}

export default Page
