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
}

export const EditFormModal = ({ isOpen, onClose }: EditFormModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent h="80%" overflow="scroll">
        <ModalHeader>活動日を追加</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <EditForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
