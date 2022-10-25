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
import { EnrollDialog } from './ConfirmDialog/EnrollDialog'

type TrialManagementTableProps = {
  trialUsers: TrialManagementTableFragment[]
}
export const TrialManagementTable = ({
  trialUsers,
}: TrialManagementTableProps) => {
  const {
    isOpen: isOpenCancel,
    onOpen: onOpenCancel,
    onClose: onCloseCancel,
  } = useDisclosure()
  const {
    isOpen: isOpenEnroll,
    onOpen: onOpenEnroll,
    onClose: onCloseEnroll,
  } = useDisclosure()
  const [targetUser, setTargetUser] =
    useState<TrialManagementTableFragment | null>(null)
  const handleClickCanselButton = (trialUser: TrialManagementTableFragment) => {
    setTargetUser(trialUser)
    onOpenCancel()
  }
  const handleClickEnrollButton = (trialUser: TrialManagementTableFragment) => {
    setTargetUser(trialUser)
    onOpenEnroll()
  }

  return (
    <TableContainer border="1px solid black" rounded="10">
      <Table variant="simple">
        <Thead bg="orange.200">
          <Tr>
            <Th textAlign="center">名前</Th>

            <Th textAlign="center">体験入会開始日</Th>

            <Th textAlign="center">体験入会終了日</Th>

            <Th textAlign="center">キャンセル</Th>

            <Th textAlign="center">本入会</Th>
          </Tr>
        </Thead>

        <Tbody>
          {trialUsers.map((trialUser) => (
            <Tr key={trialUser.id}>
              <Td textAlign="center">{trialUser.name}</Td>

              <Td textAlign="center">{trialUser.createdAt}</Td>

              <Td textAlign="center">{trialUser.expiredAt}</Td>

              <Td textAlign="center">
                <Button
                  colorScheme="orange"
                  onClick={() => {
                    handleClickCanselButton(trialUser)
                  }}
                >
                  キャンセル
                </Button>
              </Td>

              <Td textAlign="center">
                <Button
                  colorScheme="orange"
                  onClick={() => {
                    handleClickEnrollButton(trialUser)
                  }}
                >
                  本入会
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <CanselDialog
        isOpen={isOpenCancel}
        onClose={onCloseCancel}
        trialUser={targetUser}
      />

      <EnrollDialog
        isOpen={isOpenEnroll}
        onClose={onCloseEnroll}
        trialUser={targetUser}
      />
    </TableContainer>
  )
}
