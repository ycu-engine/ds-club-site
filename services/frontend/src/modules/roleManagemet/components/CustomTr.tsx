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
  VStack,
} from '@chakra-ui/react'
import { UserRole } from '../../../generates/graphql'
type CustomTrProps = {
  name: string
  roles: UserRole[]
  userId: string
  updateRoles(userId: string, roles: UserRole[]): () => void
}

export const CustomTr = ({
  name,
  roles,
  userId,
  updateRoles,
}: CustomTrProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleDeleteRole = (index: number) => {
    const new_roles = roles.concat()
    new_roles.splice(index, 1)
    updateRoles(userId, new_roles)
  }

  return (
    <Tr>
      <Td bgColor="white" borderColor="black" borderWidth="2px">
        {name}
      </Td>

      <Td bgColor="white" borderColor="black" borderWidth="2px">
        <Flex>
          <Box>
            {roles.map((role, index) => {
              return (
                <Tag key={role} mx="2">
                  <TagLabel>{role}</TagLabel>

                  <TagCloseButton
                    onClick={() => {
                      handleDeleteRole(index)
                    }}
                  />
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

              <VStack>
                <Button
                  onClick={() => {
                    // add('ADMIN')
                    onClose()
                  }}
                >
                  ADMIN
                </Button>

                <Button>STAFF</Button>

                <Button>TREASURER</Button>

                <Button>MENTER</Button>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Td>
    </Tr>
  )
}
