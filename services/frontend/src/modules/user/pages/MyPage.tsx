import { DefaultLayout } from '../../../components/Layout/DefaultLayout'
import { Box, Flex, Heading, Text, Container } from '@chakra-ui/react'
import Image from 'next/image'
import Rank from '../../../assets/images/eva.png'
import DS from '../../../assets/images/DS_degree.png'
import Engi from '../../../assets/images/Engineering_degree.png'
import Sta from '../../../assets/images/Statistics_degree.png'
import Learn from '../../../assets/images/learning_time.png'
import { COLORS } from '../../../theme'
import { useMyPageQuery } from '../../../generates/graphql'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../clients/firebase'

export const MyPage = () => {
  const [user] = useAuthState(auth)
  const { data, loading, error } = useMyPageQuery({
    skip: !user,
    variables: { userId: user?.uid ?? '' },
  })
  if (loading) {
    return 'loading'
  }
  if (error) {
    console.error(error)
    return 'error'
  }
  if (!data) {
    return 'loading'
  }

  return (
    <DefaultLayout>
      {/* 外側 */}

      <Box pb={10} pt={10} px={10} py={10}>
        {/* 一列目 */}

        <Flex
          align="center"
          direction={{ base: 'column-reverse', lg: 'row' }}
          justify="space-around"
        >
          {/* 左の要素について */}

          <Container bg="#FFFFFE" borderRadius="3xl" mx="auto" p={2}>
            <Flex justify="center">
              <Heading color={COLORS.pink}>段位:</Heading>

              <Heading color={COLORS.black}>
                {/* {data.getUser?.currentRank} */}
              </Heading>
            </Flex>

            <Image src={Rank} />
          </Container>

          {/* 右の要素について */}

          <Box bg="#FFFFFE" borderRadius="3xl" m={5} maxH="32" p={2}>
            <Text
              color={COLORS.pink}
              fontSize={{ base: '2xl', lg: '3xl' }}
              minW="24"
            >
              名前：
              <Text as="span" color={COLORS.black}>
                {data.getUser?.name}
              </Text>
            </Text>

            <Text
              color={COLORS.pink}
              fontSize={{ base: '2xl', lg: '3xl' }}
              minW="24"
            >
              会員：
              <Text as="span" color={COLORS.black}>
                {/* {data.getUser?.roles} */}
              </Text>
            </Text>
          </Box>
        </Flex>

        {/* 二列目 */}

        <Flex
          align="center"
          direction={{ base: 'column', lg: 'row' }}
          justify="space-around"
          mt={8}
        >
          <Container
            alignItems="center"
            as="section"
            bg="#0D0D0D"
            borderRadius="3xl"
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
          </Container>

          <Box bg="#FFFFFE" borderRadius="3xl" ml={5} mt={5}>
            <Heading textAlign="center">学習時間の記録</Heading>

            <Image src={Learn} />
          </Box>
        </Flex>
      </Box>
    </DefaultLayout>
  )
}
