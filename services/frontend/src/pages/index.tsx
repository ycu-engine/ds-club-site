import { Flex } from '@chakra-ui/react'
import { DefaultLayout } from '../components/DefaultLayout'
import { News } from '../modules/news/News'
import dynamic from 'next/dynamic'

const Scheduler = dynamic(
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
