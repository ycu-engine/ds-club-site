import { Container, ContainerProps, Spinner } from '@chakra-ui/react'
import { filter } from 'graphql-anywhere'
import type { ReactNode } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../clients/firebase'
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

export const MenteeListPage = () => {
  const [user, _loading] = useAuthState(auth)
  const { data, loading } = useMenteeListPageQuery({
    variables: {
      userId: user?.uid || '',
    },
  })

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
    alert('データが取得できませんでした')
    return null
  }

  return (
    <MenteeListWrapper overflow="scroll" p={5} textAlign="center">
      <MenteeList
        result={filter<MenteeListFragment>(MenteeListFragmentDoc, data.getUser)}
      />
    </MenteeListWrapper>
  )
}
