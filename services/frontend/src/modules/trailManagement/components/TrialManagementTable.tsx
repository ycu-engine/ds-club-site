import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { CanselDialog } from './ConfirmDialog/CancelDialog'

type UserType = {
  id: string
  name: string
  trialEndDate: string
  trialStartDate: string
}
const sampleUsers: UserType[] = [
  {
    id: '1',
    name: '山田太郎',
    trialEndDate: '2021-01-31',
    trialStartDate: '2021-01-01',
  },
  {
    id: '2',
    name: '山田花子',
    trialEndDate: '2021-12-31',
    trialStartDate: '2021-12-01',
  },
]
export const TrialManagementTable = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [targetUser, setTargetUser] = useState<UserType | null>(null)
  const handleClickCanselButton = (user: UserType) => {
    setTargetUser(user)
    onOpen()
  }

  return (
    <TableContainer border="1px solid black" rounded="10">
      <Table variant="simple">
        <Thead bg="orange.200">
          <Tr>
            <Th>名前</Th>

            <Th>体験入会開始日</Th>

            <Th>体験入会終了日</Th>

            <Th>キャンセル</Th>
          </Tr>
        </Thead>

        <Tbody>
          {sampleUsers.map((user) => (
            <Tr key={user.id}>
              <Td>{user.name}</Td>

              <Td>{user.trialStartDate}</Td>

              <Td>{user.trialEndDate}</Td>

              <Td>
                <Button
                  colorScheme="orange"
                  onClick={() => {
                    handleClickCanselButton(user)
                  }}
                >
                  キャンセル
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <CanselDialog isOpen={isOpen} onClose={onClose} user={targetUser} />
    </TableContainer>
  )
}
