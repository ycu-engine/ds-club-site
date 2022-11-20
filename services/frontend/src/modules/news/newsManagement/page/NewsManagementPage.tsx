import { Container, Heading } from '@chakra-ui/react'
import { MakeNewsModal } from '../components/CreateNewsModal'

export const NewsManagementPage = () => {
  return (
    <Container>
      <Heading my="5">お知らせ管理ページ</Heading>

      <MakeNewsModal />
    </Container>
  )
}
