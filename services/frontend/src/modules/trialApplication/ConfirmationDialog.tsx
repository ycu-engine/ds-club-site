import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  TableContainer,
  Tbody,
  Td,
  Th,
  Tr,
  TableCaption,
  Table,
} from '@chakra-ui/react'
import { useRef } from 'react'
import type { TrialApplicationForm } from './pages/SubmitTrialApplicationPage'

type InfoTableProps = {
  trialApplication: TrialApplicationForm
}
const InfoTable = ({
  trialApplication: { name, email, affiliation },
}: InfoTableProps) => {
  return (
    <TableContainer>
      <Table>
        <Tbody>
          <Tr>
            <Th>名前</Th>

            <Td>{name}</Td>
          </Tr>

          <Tr>
            <Th>メールアドレス</Th>

            <Td>{email}</Td>
          </Tr>

          <Tr>
            <Th>所属</Th>

            <Td>{affiliation}</Td>
          </Tr>
        </Tbody>

        <TableCaption>
          上記の内容で間違いはないですか？この操作は取り消せません。
        </TableCaption>
      </Table>
    </TableContainer>
  )
}

type ConfirmDialogProps = {
  isOpen: boolean
  onClose: () => void
  trialApplicationInfo: TrialApplicationForm
  onSubmit: () => void
  formId: string
  isLoading: boolean
}
export const ConfirmDialog = ({
  isOpen,
  onClose,
  trialApplicationInfo,
  onSubmit,
  formId,
  isLoading,
}: ConfirmDialogProps) => {
  const cancelRef = useRef(null)

  return (
    <>
      <AlertDialog
        closeOnOverlayClick={false}
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        size="xl"
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              確認画面
            </AlertDialogHeader>

            <AlertDialogBody>
              <InfoTable trialApplication={trialApplicationInfo} />
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button isDisabled={isLoading} onClick={onClose} ref={cancelRef}>
                戻る
              </Button>

              <Button
                colorScheme="red"
                form={formId}
                isLoading={isLoading}
                ml={3}
                onClick={onSubmit}
              >
                申請する
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
