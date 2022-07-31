import { DefaultLayout } from '../components/DefaultLayout'
import { Box, Flex, Heading, Text, Container } from '@chakra-ui/react'

import Image from 'next/image'
import Rank from '../assets/images/eva.png'
import DS from '../assets/images/DS_degree.png'
import Engi from '../assets/images/Engineering_degree.png'
import Sta from '../assets/images/Statistics_degree.png'
import Learn from '../assets/images/learning_time.png'
const br = '3xl'
const ranktext = '5xl'
const bigwidth = 550
const pink = '#D9376E'
const font = { base: '2xl', lg: '3xl' }

const Page = () => {
  return (
    <DefaultLayout>
      {/* 外側 */}

      <Box pb={10} pt={10} px={10} py={10}>
        {/* 一列目 */}

        <Flex
          // align="stretch"
          direction={{ base: 'column-reverse', lg: 'row' }}
          justify="space-around"
        >
          {/* 左の要素について */}

          {/* <Box bg="#FFFFFE" borderRadius={br}>
            <Flex
              align="center"
              direction="column"
              justify="space-around"
              p={2}
            >
              <Box>
                <Flex>
                  <Text color={pink} fontSize={ranktext}>
                    段位:
                  </Text>

                  <Text fontSize={ranktext}>エヴァンジェリスト</Text>
                </Flex>

                <Box bg="teal.800">
                  <Image objectFit="cover" src={Rank} />
                </Box>
              </Box>
            </Flex>
          </Box> */}

          <Container>
            <Box bg="#FFFFFE" borderRadius={br} mx="auto" p={2}>
              <Flex justify="center">
                <Heading color={pink}>段位:</Heading>

                <Heading color="#0D0D0D">エヴァンジェリスト</Heading>
              </Flex>

              <Image src={Rank} />
            </Box>
          </Container>

          {/* 右の要素について */}

          <Flex align="center" justify="center" m={5}>
            <Flex align="center" bg="#FFFFFE" borderRadius={br} p={2}>
              <Flex align="center" direction="column">
                <Text color={pink} fontSize={font}>
                  名前：
                </Text>

                <Text color={pink} fontSize={font}>
                  会員：
                </Text>
              </Flex>

              <Flex align="center" direction="column">
                <Text fontSize={font}>諸田</Text>

                <Text fontSize={font}>代表</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        {/* 二列目 */}

        <Flex
          align="center"
          direction={{ base: 'column', lg: 'row' }}
          justify="space-around"
          mt={8}
        >
          <Container>
            <Box
              alignItems="center"
              bg="#0D0D0D"
              borderRadius={br}
              mx="auto"
              p={3}
            >
              <Heading color="#FFFFFE" textAlign="center">
                称号
              </Heading>

              <Flex justify="space-around" mx="auto">
                <Box bg="transparent">
                  <Image objectFit="contain" src={DS} />
                </Box>

                <Box bg="transparent">
                  <Image objectFit="contain" src={Engi} />
                </Box>

                <Box bg="transparent">
                  <Image objectFit="contain" src={Sta} />
                </Box>
              </Flex>

              <Heading color="#FFFFFE" textAlign="center">
                あと1つで称号獲得!
              </Heading>
            </Box>
          </Container>

          <Box bg="#FFFFFE" borderRadius={br} ml={5} mt={5}>
            <Heading textAlign="center">学習時間の記録</Heading>

            <Image src={Learn} />
          </Box>
        </Flex>
      </Box>
    </DefaultLayout>
  )
}

export default Page
