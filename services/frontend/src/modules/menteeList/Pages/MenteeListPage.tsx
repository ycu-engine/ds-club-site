import {
  Container,
  ContainerProps,
  Spinner,
  useToast,
  Text,
} from '@chakra-ui/react'
import { filter } from 'graphql-anywhere'
import type { ReactNode } from 'react'
import {
  MenteeListFragment,
  MenteeListFragmentDoc,
  useMenteeListPageQuery,
} from '../../../generates/graphql'
import { MenteeList } from '../conpoments/MenteeList'

type MenteeListWrapperProps = {
  children: ReactNode
} & ContainerProps
const MenteeListWrapper = ({ children, ...props }: MenteeListWrapperProps) => {
  return (
    <Container
      bg="white"
      borderRadius={15}
      boxShadow="md"
      h="50vh"
      mt="10vh"
      {...props}
    >
      {children}
    </Container>
  )
}

type MenteeListPageProps = {
  userId: string
}
export const MenteeListPage = ({ userId }: MenteeListPageProps) => {
  const { data, loading } = useMenteeListPageQuery({
    skip: !userId,
    variables: {
      userId: userId,
    },
  })
  const toast = useToast()

  if (loading) {
    return (
      <MenteeListWrapper
        alignItems="center"
        display="flex"
        justifyContent="center"
      >
        <Spinner size="lg" />
      </MenteeListWrapper>
    )
  }

  if (!data) {
    toast({
      description: 'データの取得に失敗しました。もう一度お試しください。',
      duration: 9000,
      isClosable: true,
      status: 'error',
      title: 'Error',
    })
    return (
      <MenteeListWrapper p={5} textAlign="center">
        <Text fontWeight="bold" size="lg">
          データがありません
        </Text>
      </MenteeListWrapper>
    )
  }

  return (
    <MenteeListWrapper overflow="scroll" p={5} textAlign="center">
      <MenteeList
        result={filter<MenteeListFragment>(MenteeListFragmentDoc, data.getUser)}
      />
    </MenteeListWrapper>
  )
}
