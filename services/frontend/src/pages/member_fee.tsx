import { DefaultLayout } from '../components/DefaultLayout'
import { Text, Box, Heading, Flex } from '@chakra-ui/react'

const Page = () => {
  return (
    <DefaultLayout>
      <Flex direction={{ base: 'column', md: 'row' }} gap={5}>
        <Box background="#fff" borderRadius="3xl" flex={1} p={5}>
          <Heading textAlign="center">支払い状況</Heading>
        </Box>

        <Flex direction="column" flex={1}>
          <Box background="#fff" borderRadius="3xl" flex={1} p={5}>
            <Heading textAlign="center">支払い状況</Heading>
          </Box>

          <Box background="#fff" borderRadius="3xl" flex={1} p={5}>
            <Heading textAlign="center">支払い状況</Heading>
          </Box>
        </Flex>
      </Flex>

      <Text>支払い状況</Text>
    </DefaultLayout>
  )
}

export default Page
