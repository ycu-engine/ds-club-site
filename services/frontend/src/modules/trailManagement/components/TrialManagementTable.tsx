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
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../clients/firebase'
import {
  TrialManagementPageDocument,
  TrialManagementTableFragment,
  useEnableTrialUserMutation,
} from '../../../generates/graphql'
import { CanselDialog } from './ConfirmDialog/CancelDialog'
import { EnrollDialog } from './ConfirmDialog/EnrollDialog'

type TrialManagementTableProps = {
  trialUsers: TrialManagementTableFragment[]
}
export const TrialManagementTable = ({
  trialUsers,
}: TrialManagementTableProps) => {
  const [user, _loading] = useAuthState(auth)
  const [enableTrialUserMutation, { loading }] = useEnableTrialUserMutation({})
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

  const handleClickEnabelButton = async (
    trialUser: TrialManagementTableFragment,
  ) => {
    await enableTrialUserMutation({
      refetchQueries: [
        {
          query: TrialManagementPageDocument,
          variables: { userId: user?.uid },
        },
      ],
      variables: { userId: trialUser.id },
    })
  }

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

            <Th textAlign="center">認証情報</Th>

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
                {trialUser.disabled ? (
                  <Button
                    colorScheme="blue"
                    isLoading={loading}
                    onClick={() => handleClickEnabelButton(trialUser)}
                  >
                    有効にする
                  </Button>
                ) : (
                  '認証済み'
                )}
              </Td>

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
