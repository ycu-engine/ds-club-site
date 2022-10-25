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
import type { TrialManagementTableFragment } from '../../../generates/graphql'
import { CanselDialog } from './ConfirmDialog/CancelDialog'

type TrialManagementTableProps = {
  trialUsers: TrialManagementTableFragment[]
}
export const TrialManagementTable = ({
  trialUsers,
}: TrialManagementTableProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [targetUser, setTargetUser] =
    useState<TrialManagementTableFragment | null>(null)
  const handleClickCanselButton = (user: TrialManagementTableFragment) => {
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
          {trialUsers.map((trialUser) => (
            <Tr key={trialUser.id}>
              <Td>{trialUser.name}</Td>

              <Td>{trialUser.createdAt}</Td>

              <Td>{trialUser.expiredAt}</Td>

              <Td>
                <Button
                  colorScheme="orange"
                  onClick={() => {
                    handleClickCanselButton(trialUser)
                  }}
                >
                  キャンセル
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <CanselDialog isOpen={isOpen} onClose={onClose} trialUser={targetUser} />
    </TableContainer>
  )
}
