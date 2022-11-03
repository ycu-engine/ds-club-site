import type { DocumentNode } from '@apollo/client'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react'
import { EditForm } from './EditForm'

type EditFormModalProps = {
  isOpen: boolean
  onClose: () => void
  refetchQueryDoc: DocumentNode
}

export const EditFormModal = ({
  isOpen,
  onClose,
  refetchQueryDoc,
}: EditFormModalProps) => {
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent h="80%" overflow="scroll">
        <ModalHeader>活動日を追加</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <EditForm refetchQueryDoc={refetchQueryDoc} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
