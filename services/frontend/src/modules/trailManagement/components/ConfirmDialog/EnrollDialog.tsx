import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
} from '@chakra-ui/react'
import { useRef } from 'react'
import {
  TrialManagementPageDocument,
  TrialManagementTableFragment,
  useEnrollDialogMutation,
} from '../../../../generates/graphql'
import { UserInfoTable } from './UserInfoTable'

type EnrollDialogProps = {
  isOpen: boolean
  onClose: () => void
  trialUser: TrialManagementTableFragment | null
}
export const EnrollDialog = ({
  isOpen,
  onClose,
  trialUser,
}: EnrollDialogProps) => {
  const toast = useToast()
  const [enrollDialogMutation, { loading }] = useEnrollDialogMutation({
    onCompleted: () => {
      toast({
        duration: 3000,
        isClosable: true,
        status: 'success',
        title: '入会が完了しました',
      })
    },
    onError: () => {
      toast({
        duration: 3000,
        isClosable: true,
        status: 'error',
        title: '入会処理に失敗しました\nログイン状態や権限を確認してください。',
      })
    },
    refetchQueries: [{ query: TrialManagementPageDocument }],
    variables: {
      userId: trialUser?.id || '',
    },
  })
  const cancelRef = useRef(null)
  const handleClickEnrollButton = async () => {
    await enrollDialogMutation({
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
              本入会確認画面
            </AlertDialogHeader>

            <AlertDialogBody>
              <UserInfoTable
                caption="本入会処理を行いますか？この操作は取り消せません。"
                trialUser={trialUser}
              />
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose} ref={cancelRef}>
                戻る
              </Button>

              <Button
                colorScheme="red"
                isLoading={loading}
                ml={3}
                onClick={handleClickEnrollButton}
              >
                入会処理を行う
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
