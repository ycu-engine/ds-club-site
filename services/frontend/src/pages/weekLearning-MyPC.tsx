import { DefaultLayout } from '../components/DefaultLayout'
import { Box } from '@chakra-ui/react'

const Page = () => {
  return (
    <DefaultLayout>
      <Box p={5}>
        <Flex>
          <Box />

          <Box />
        </Flex>
      </Box>
    </DefaultLayout>
  )
}

export default Page
