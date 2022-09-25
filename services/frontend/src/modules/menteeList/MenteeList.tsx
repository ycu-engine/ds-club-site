// import { ExternalLinkIcon } from '@chakra-ui/icons'
import {
  Box,
  Container,
  Heading,
  Link,
  Spinner,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { auth } from '../../clients/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useGetMenteeQuery } from '../../generates/graphql'
import { ExternalLinkIcon } from '@chakra-ui/icons'

export const MenteeList: React.FC = () => {
  const [user, _loading] = useAuthState(auth)
  if (!user) {
    return null
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, loading } = useGetMenteeQuery({
    variables: { userId: user.uid || '' },
  })

  if (loading) {
    return (
      <Container
        bg="white"
        borderRadius={15}
        boxShadow="md"
        h="50vh"
        mt="10vh"
        p={5}
        position="relative"
        textAlign="center"
        verticalAlign="middle"
      >
        <Spinner position="absolute" size="lg" top="40%" />
      </Container>
    )
  }

  if (!data) {
    return null
  }

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
    >
      <VStack spacing={10}>
        <Heading fontSize={{ base: 'lg', md: '2xl' }}>
          {data?.getUser.name} さんのメンティー一覧
        </Heading>

        {data.getUser.mentee.map((mentee) => (
          <Box fontSize={{ base: 'md', md: 'xl' }} key={mentee.name}>
            {mentee.name}

            {' : '}

            <Link color="teal.500" href={`users/${mentee.id}`}>
              個人ページ
              <ExternalLinkIcon mx="2px" />
            </Link>
          </Box>
        ))}
      </VStack>
    </Container>
  )
}
