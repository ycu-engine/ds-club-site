import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
  Spinner,
} from '@chakra-ui/react'
import { useRef } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../../../../clients/firebase'
import {
  TrialManagementPageDocument,
  TrialManagementTableFragment,
  useCancelDialogMutation,
} from '../../../../../../generates/graphql'
import { UserInfoTable } from './UserInfoTable'

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
  const [user, authLoading] = useAuthState(auth)
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
    refetchQueries: [
      { query: TrialManagementPageDocument, variables: { userId: user?.uid } },
    ],
    variables: {
      userId: trialUser?.id || '',
    },
  })
  const cancelRef = useRef(null)
  if (authLoading) return <Spinner />
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
              <UserInfoTable
                caption="本当にキャンセルしますか？この操作は取り消せません。"
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
