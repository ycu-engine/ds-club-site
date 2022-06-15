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

      <Box pb={10} pt={10} px={10} py={10}>
        {/* 一列目 */}

        <Flex
          align="stretch"
          direction={{ base: 'column-reverse', md: 'row' }}
          justify="space-around"
        >
          {/* 左の要素について */}

          <Box bg="#FFFFFE" borderRadius={br} h={325}>
            <Flex align="center" direction="column" justify="space-around">
              <Flex>
                <Text color={pink} fontSize={ranktext}>
                  段位:
                </Text>

                <Text fontSize={ranktext}>エヴァンジェリスト</Text>
              </Flex>

              <Box bg="#FF8E3C" h={200} mt={6}>
                <Image src={Rank} />
              </Box>
            </Flex>
          </Box>

          {/* 右の要素について */}

          <Box bg="#FFFFFE" borderRadius={br} ml={5}>
            <Flex align="center">
              <Flex align="center" direction="column">
                <Text color={pink}>名前：</Text>

                <Text color={pink}>会員：</Text>
              </Flex>

              <Flex align="center" direction="column">
                <Text />

                <Text />
              </Flex>
            </Flex>
          </Box>
        </Flex>

        {/* 二列目 */}

        <Flex align="center" justify="space-around" mt={8}>
          <Box bg="#0D0D0D" borderRadius={br} minH={200} minW={bigwidth} />

          <Box bg="#FFFFFE" borderRadius={br} h={200} ml={5} />
        </Flex>
      </Box>
    </DefaultLayout>
  )
}

export default Page
