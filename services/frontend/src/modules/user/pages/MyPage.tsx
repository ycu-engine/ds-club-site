import { Box, Flex, Heading, Text, AspectRatio } from '@chakra-ui/react'
import Image from 'next/image'
import Rank from '../../../assets/images/eva.png'
import DS from '../../../assets/images/DS_degree.png'
import Engi from '../../../assets/images/Engineering_degree.png'
import Sta from '../../../assets/images/Statistics_degree.png'
import { COLORS } from '../../../theme'
import {
  StudyLog_StudyLogGraphFragment,
  StudyLog_StudyLogGraphFragmentDoc,
  useMyPageQuery,
} from '../../../generates/graphql'
import { Loading } from 'components/Layout/Loading'
import { StudyLogSpan } from 'modules/studyLog/components/StudyLogSpan'
import { filter } from 'graphql-anywhere'

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
    <Box p={10}>
      <Flex
        align="center"
        alignContent="center"
        direction={{ base: 'column-reverse', lg: 'row' }}
        gap={10}
        justify="space-around"
      >
        <Box
          bg={COLORS.white}
          borderRadius="3xl"
          p={5}
          textAlign="center"
          w={{ base: '100%', lg: '50%' }}
        >
          <Heading color={COLORS.black}>
            <Text as="span" color={COLORS.pink}>
              段位:{' '}
            </Text>

            {data.getUser?.__typename === 'RegularUser'
              ? data.getUser.currentRank
              : '未登録'}
          </Heading>

          <AspectRatio maxW="300px" mx="auto" ratio={1}>
            <Image src={Rank} />
          </AspectRatio>
        </Box>

        <Box bg={COLORS.white} borderRadius="3xl" p={10}>
          <Text color={COLORS.pink} fontSize={{ base: '2xl', lg: '3xl' }}>
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

      <Flex
        align="center"
        direction={{ base: 'column', lg: 'row' }}
        gap={10}
        justify="space-around"
        mt={8}
      >
        <Box
          alignItems="center"
          as="section"
          bg="#0D0D0D"
          borderRadius="3xl"
          p={3}
          w={{ base: '100%', lg: '50%' }}
        >
          <Heading color={COLORS.white} textAlign="center">
            称号
          </Heading>

          <Flex gap={3} justify="space-around" mx="auto">
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

          <Heading color={COLORS.white} textAlign="center">
            あと1つで称号獲得!
          </Heading>
        </Box>

        <StudyLogSpan
          data={filter<StudyLog_StudyLogGraphFragment[]>(
            StudyLog_StudyLogGraphFragmentDoc,
            data.getUser?.studyLogs,
          )}
          w={{ base: '100%', lg: '50%' }}
        />
      </Flex>
    </Box>
  )
}
