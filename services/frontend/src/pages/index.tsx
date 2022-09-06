import { DefaultLayout } from '../components/DefaultLayout'
import { Flex } from '@chakra-ui/react'
import { News } from '../modules/news/News'
import { DScheduler } from '../modules/scheduler/Scheduler'

const Page = () => {
  return (
    <DefaultLayout>
      <Flex direction={['column', 'row']}>
        <News />

        <DScheduler />
      </Flex>
    </DefaultLayout>
  )
}

export default Page
