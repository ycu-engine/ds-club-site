import { DefaultLayout } from '../components/DefaultLayout'
import { Text, Flex, Box } from '@chakra-ui/react'

const Page = () => {
  return (
    <DefaultLayout>
      <Box p="4">
        <Flex justify="center">
          <Text fontFamily="fantasy">Kento Morita</Text>
        </Flex>
      </Box>
    </DefaultLayout>
  )
}

export default Page
