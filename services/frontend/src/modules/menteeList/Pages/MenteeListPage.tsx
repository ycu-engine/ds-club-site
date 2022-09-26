import { Container, ContainerProps, Spinner } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../clients/firebase'
import { useMenteeListPageQuery } from '../../../generates/graphql'
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
      overflow="scroll"
      p={5}
      textAlign="center"
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
      <MenteeListWrapper position="relative">
        <Spinner position="absolute" size="lg" top="40%" />
      </MenteeListWrapper>
    )
  }

  if (!data) {
    return null
  }

  return (
    <MenteeListWrapper>
      <MenteeList {...data.getUser} />
    </MenteeListWrapper>
  )
}
