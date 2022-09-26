import {
  VStack,
  Container,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Flex,
  IconButton,
  Text,
} from '@chakra-ui/react'

import { CloseIcon } from '@chakra-ui/icons'
import { SidebarButton } from './Button/SidebarButton'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../clients/firebase'

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
}
export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [user, _loading] = useAuthState(auth)
  const button_contents = [
    { link: user ? `/users/${user.uid}/mypage` : '/login', text: '個人ページ' },
    { link: user ? `/users/${user.uid}/weekly` : '/login', text: '週目標' },
    { link: '/materials', text: '教材' },
    { link: '/test', text: 'テスト' },
    { link: '/documents', text: '資料' },
  ]

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="left">
      <DrawerOverlay />

      <DrawerContent>
        <Container bgColor="orange.400" h="100vh">
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

              {button_contents.map((button_content) => {
                return (
                  <SidebarButton
                    key={button_content.link}
                    link={button_content.link}
                  >
                    {button_content.text}
                  </SidebarButton>
                )
              })}
            </VStack>
          </DrawerBody>
        </Container>
      </DrawerContent>
    </Drawer>
  )
}
