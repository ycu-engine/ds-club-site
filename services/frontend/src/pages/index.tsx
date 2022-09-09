import { Flex } from '@chakra-ui/react'
import { DefaultLayout } from '../components/DefaultLayout'
import { News } from '../modules/news/News'
import dynamic from 'next/dynamic'
import type { SchedulerProps } from '../modules/scheduler/Scheduler'

const Scheduler = dynamic<SchedulerProps>(
  () => import('../modules/scheduler/Scheduler').then((mod) => mod.Scheduler),
  {
    ssr: false,
  },
)

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
