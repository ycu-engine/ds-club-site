import { Flex } from '@chakra-ui/react'
import { Calender } from '../components/Calender'
import { DefaultLayout } from '../components/DefaultLayout'
import { News } from '../modules/news/News'

const HomePage = () => {
  return (
    <DefaultLayout>
      <Flex direction={['column', 'row']}>
        <News />

        <Calender />
      </Flex>
    </DefaultLayout>
  )
}

export default HomePage
