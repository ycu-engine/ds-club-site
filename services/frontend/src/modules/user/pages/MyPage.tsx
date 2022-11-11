import { Box, Flex, Heading, Text, Container } from '@chakra-ui/react'
import Image from 'next/image'
import Rank from '../../../assets/images/eva.png'
import DS from '../../../assets/images/DS_degree.png'
import Engi from '../../../assets/images/Engineering_degree.png'
import Sta from '../../../assets/images/Statistics_degree.png'
import Learn from '../../../assets/images/learning_time.png'
import { COLORS } from '../../../theme'
import { useMyPageQuery } from '../../../generates/graphql'
import { Loading } from 'components/Layout/Loading'

type MyPageProps = {
  userId: string
}
export const MyPage = ({ userId }: MyPageProps) => {
  const { data, loading, error } = useMyPageQuery({
    variables: { userId },
  })
  if (loading) {
    return <Loading loadingText="読み込み中..." />
  }
  if (error) {
    console.error(error)
    return <Loading loadingText="エラーが発生しました" />
  }
  if (!data) {
    return <Loading loadingText="データがありません" />
  }

  return (
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
              {data.getUser?.__typename === 'RegularUser'
                ? data.getUser.currentRank
                : '未登録'}
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
              {data.getUser?.__typename === 'RegularUser'
                ? '一般会員'
                : '体験会員'}
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
  )
}
