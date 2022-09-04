import {
  VStack,
  Container,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
  Flex,
  IconButton,
  Text,
} from '@chakra-ui/react'

import { CloseIcon } from '@chakra-ui/icons'

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
}
export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const button_texts = ['個人ページ', '週目標', '教材', 'テスト', '資料']

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="left">
      <DrawerOverlay />

      <DrawerContent>
        <Container>
          <DrawerHeader borderBottomWidth="1px">
            <Flex alignItems="center" justifyContent="space-between">
              <Text>各種リンク</Text>

              <IconButton
                aria-label="close-drawer"
                colorScheme="orange"
                icon={<CloseIcon />}
                onClick={onClose}
                size="sm"
              />
            </Flex>
          </DrawerHeader>

          <DrawerBody>
            <VStack p={5} spacing={10}>
              {/* ボタンをmapで追加 */}

              {button_texts.map((button_text) => {
                return (
                  <Button
                    _hover={{ bg: 'blackAlpha.600' }}
                    bg="black"
                    borderRadius="20"
                    color="white"
                    key={button_text}
                    w="40"
                  >
                    {button_text}
                  </Button>
                )
              })}
            </VStack>
          </DrawerBody>
        </Container>
      </DrawerContent>
    </Drawer>
  )
}
