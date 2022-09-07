import { Flex } from '@chakra-ui/react'
import { DefaultLayout } from '../components/DefaultLayout'
import { News } from '../modules/news/News'
import { Scheduler } from '../modules/scheduler/Scheduler'

const HomePage = () => {
  return (
    <DefaultLayout authenticated={false}>
      <Flex direction={['column', 'row']} justifyContent="space-between" p={5}>
        <News />

        <Scheduler />
      </Flex>
    </DefaultLayout>
  )
}

export default HomePage
