import { Container, Heading, Box, Link, VStack } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { DefaultLayout } from '../components/DefaultLayout'

interface mentee {
  name: string
  link: string
}
interface MenteeListProps {
  mentorName: string
  mentees: mentee[]
}
const MenteeList = () => {
  const menteeList: MenteeListProps = {
    mentees: [
      {
        link: 'https://www.google.com/',
        name: 'メンティー1号',
      },
      {
        link: 'https://www.google.com/',
        name: 'メンティー2号',
      },
      {
        link: 'https://www.google.com/',
        name: 'メンティー3号',
      },
      {
        link: 'https://www.google.com/',
        name: 'メンティー4号',
      },
    ],
    mentorName: 'メンター1号',
  }
  return (
    <DefaultLayout authenticated={false}>
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
            {menteeList.mentorName} さんのメンティー一覧
          </Heading>

          {menteeList.mentees.map((mentee) => (
            <Box fontSize={{ base: 'md', md: 'xl' }} key={mentee.name}>
              {mentee.name}

              {' : '}

              <Link color="teal.500" href={mentee.link}>
                個人ページ
                <ExternalLinkIcon mx="2px" />
              </Link>
            </Box>
          ))}
        </VStack>
      </Container>
    </DefaultLayout>
  )
}

export default MenteeList
