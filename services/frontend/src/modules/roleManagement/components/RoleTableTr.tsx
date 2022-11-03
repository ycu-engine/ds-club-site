import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tag,
  TagCloseButton,
  TagLabel,
  Td,
  Text,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import type { RoleTableTrFragment, UserRole } from '../../../generates/graphql'
import { AddButton } from './AddButton'

type RoleTableTrProps = RoleTableTrFragment & {
  removeUserRole(userId: string, role: UserRole): () => unknown
  addUserRole(userId: string, role: UserRole): () => unknown
}

export const RoleTableTr = ({
  id,
  name,
  roles,
  removeUserRole,
  addUserRole,
}: RoleTableTrProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Tr>
      <Td bgColor="white" borderColor="black" borderWidth="2px">
        {name}
      </Td>

      <Td bgColor="white" borderColor="black" borderWidth="2px">
        <Flex>
          <Box>
            {roles.map((role: string) => {
              return (
                <Tag key={role} mx="2">
                  <TagLabel>{role}</TagLabel>

                  <TagCloseButton />
                </Tag>
              )
            })}
          </Box>
        </Flex>
      </Td>

      <Td>
        <Button
          _hover={{ bgColor: 'blue.200' }}
          bgColor="blue.300"
          onClick={onOpen}
          size="sm"
        >
          +
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />

          <ModalContent>
            <ModalHeader>権限の追加</ModalHeader>

            <ModalBody>
              <Text pb="5">追加する権限を選択してください</Text>

              <AddButton addUserRole={addUserRole} userId={id} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Td>
    </Tr>
  )
}
