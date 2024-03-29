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
import { COLORS } from '../theme'
import { RoleOnlyWrapper } from '../modules/userFilter/wrappers/RoleOnlyWrapper/RoleOnlyWrapper'
import { UserRole } from '../generates/graphql'

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
}
export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [user, _loading] = useAuthState(auth)
  const button_contents = [
    { link: user ? `/users/${user.uid}/mypage` : '/login', text: '個人ページ' },
    {
      link: user ? `/users/${user.uid}/study-log` : '/login',
      text: '学習記録',
    },
    { link: '/materials', text: '教材' },
    // { link: '/test', text: 'テスト' },
    { link: '/view-terms', text: '会員規約等' },
  ]

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="left">
      <DrawerOverlay />

      <DrawerContent>
        <Container bgColor={COLORS.orange} h="100vh">
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

          <DrawerBody as={VStack} p={5} spacing={10}>
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

            <RoleOnlyWrapper roles={UserRole.Admin}>
              <SidebarButton link="/admin">管理者ページ</SidebarButton>
            </RoleOnlyWrapper>
          </DrawerBody>
        </Container>
      </DrawerContent>
    </Drawer>
  )
}
