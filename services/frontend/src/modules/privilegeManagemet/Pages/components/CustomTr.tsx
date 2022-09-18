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

type Privilege = ['Admin' | 'Staff' | 'Menter']

type CustomTrProps = {
  name: string
  privilege: string[]
  add: VoidFunction
  del: VoidFunction
}

export const CustomTr = ({ name, privilege, add, del }: CustomTrProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Tr>
      <Td bgColor="white" borderColor="black" borderWidth="2px">
        {name}
      </Td>

      <Td bgColor="white" borderColor="black" borderWidth="2px">
        <Flex>
          <Box>
            {privilege.map((pri) => {
              return (
                <Tag key={pri} mx="2">
                  <TagLabel>{pri}</TagLabel>

                  <TagCloseButton
                    onClick={() => {
                      del((privilege = pri))
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
                    add((privilege = 'ADMIN'))
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
