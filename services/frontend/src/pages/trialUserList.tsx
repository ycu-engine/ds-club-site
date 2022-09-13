import {
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
} from '@chakra-ui/react'
import { DefaultLayout } from '../components/DefaultLayout'
import { COLORS } from '../theme'

// import { useState } from 'react'
const trialUsers = [
  { end: '2022/6/24', name: '岡田拓也', start: '2022/5/24' },
  { end: '2022/7/31', name: '諸田健太朗', start: '2022/6/31' },
]
const appendUser = () => {
  const rows = []
  for (const dict of trialUsers) {
    const row = []
    row.push(<Td>{dict.name}</Td>)
    row.push(<Td>{dict.start}</Td>)
    row.push(<Td>{dict.end}</Td>)
    row.push(<Td>{BasicUsage()}</Td>)

    rows.push(<Tr>{row}</Tr>)
  }
  return rows
}
const BasicUsage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button
        backgroundColor={COLORS.pink}
        color={COLORS.white}
        onClick={onOpen}
      >
        キャンセル
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>確認！！</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              ほんとうにキャンセルしますか？
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} variant="ghost">
              はい
            </Button>

            <Button
              backgroundColor={COLORS.pink}
              color={COLORS.white}
              onClick={onClose}
            >
              いいえ
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
const Page = () => {
  return (
    <DefaultLayout>
      <Heading m={8}>体験入会管理ページ</Heading>

      <TableContainer m={[30, 10]}>
        <Table variant="simple">
          <Thead backgroundColor={COLORS.black}>
            <Tr>
              <Th color={COLORS.white}>名前</Th>

              <Th color={COLORS.white}>体験開始日</Th>

              <Th color={COLORS.white}>体験終了日</Th>

              <Th color={COLORS.white}> キャンセル</Th>
            </Tr>
          </Thead>

          <Tbody backgroundColor={COLORS.white}>{appendUser()}</Tbody>
        </Table>
      </TableContainer>
    </DefaultLayout>
  )
}
export default Page
