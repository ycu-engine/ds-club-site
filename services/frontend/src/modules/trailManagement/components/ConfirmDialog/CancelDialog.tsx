import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
  TableContainer,
  Tbody,
  Td,
  Th,
  Tr,
  TableCaption,
  Table,
} from '@chakra-ui/react'
import { useRef } from 'react'
import {
  TrialManagementPageDocument,
  TrialManagementTableFragment,
  useCancelDialogMutation,
} from '../../../../generates/graphql'

type UserInfoTableProps = {
  trialUser: TrialManagementTableFragment | null
}
const UserInfoTable = ({ trialUser }: UserInfoTableProps) => {
  return (
    <TableContainer>
      <Table>
        <Tbody>
          <Tr>
            <Th>名前</Th>

            <Td>{trialUser?.name}</Td>
          </Tr>

          <Tr>
            <Th>体験入会開始日</Th>

            <Td>{trialUser?.createdAt}</Td>
          </Tr>

          <Tr>
            <Th>体験入会終了日</Th>

            <Td>{trialUser?.expiredAt}</Td>
          </Tr>
        </Tbody>

        <TableCaption>
          本当にキャンセルしますか？この操作は取り消せません。
        </TableCaption>
      </Table>
    </TableContainer>
  )
}

type CancelDialogProps = {
  isOpen: boolean
  onClose: () => void
  trialUser: TrialManagementTableFragment | null
}
export const CanselDialog = ({
  isOpen,
  onClose,
  trialUser,
}: CancelDialogProps) => {
  const toast = useToast()
  const [cancelDialogMutation, { loading }] = useCancelDialogMutation({
    onCompleted: () => {
      toast({
        duration: 3000,
        isClosable: true,
        status: 'success',
        title: 'キャンセルしました',
      })
    },
    onError: () => {
      toast({
        duration: 3000,
        isClosable: true,
        status: 'error',
        title:
          'キャンセルに失敗しました\nログイン状態や権限を確認してください。',
      })
    },
    refetchQueries: [{ query: TrialManagementPageDocument }],
    variables: {
      userId: trialUser?.id || '',
    },
  })
  const cancelRef = useRef(null)
  const handleClickCanselButton = async () => {
    await cancelDialogMutation({
      variables: {
        userId: trialUser?.id || '',
      },
    })
    onClose()
  }

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              体験入会キャンセル確認画面
            </AlertDialogHeader>

            <AlertDialogBody>
              <UserInfoTable trialUser={trialUser} />
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose} ref={cancelRef}>
                戻る
              </Button>

              <Button
                colorScheme="red"
                isLoading={loading}
                ml={3}
                onClick={handleClickCanselButton}
              >
                キャンセルする
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
