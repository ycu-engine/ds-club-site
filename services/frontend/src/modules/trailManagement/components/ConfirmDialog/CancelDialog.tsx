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

type UserType = {
  id: string
  name: string
  trialEndDate: string
  trialStartDate: string
}

type UserInfoTableProps = {
  user: UserType | null
}
const UserInfoTable = ({ user }: UserInfoTableProps) => {
  return (
    <TableContainer>
      <Table>
        <Tbody>
          <Tr>
            <Th>名前</Th>

            <Td>{user?.name}</Td>
          </Tr>

          <Tr>
            <Th>体験入会開始日</Th>

            <Td>{user?.trialStartDate}</Td>
          </Tr>

          <Tr>
            <Th>体験入会終了日</Th>

            <Td>{user?.trialEndDate}</Td>
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
  user: UserType | null
}
export const CanselDialog = ({ isOpen, onClose, user }: CancelDialogProps) => {
  const cancelRef = useRef(null)
  const toast = useToast()
  const handleClickCanselButton = () => {
    onClose()
    toast({
      duration: 3000,
      isClosable: true,
      status: 'success',
      title: 'キャンセルしました',
    })
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
              <UserInfoTable user={user} />
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose} ref={cancelRef}>
                戻る
              </Button>

              <Button
                colorScheme="red"
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
