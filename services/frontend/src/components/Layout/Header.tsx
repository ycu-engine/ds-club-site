import {
  Box,
  Text,
  Flex,
  Spacer,
  Heading,
  IconButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import Logo from '../../assets/images/icon.png'
import Image from 'next/image'
import { Sidebar } from '../Sidebar'
import { useRouter } from 'next/router'
import { COLORS } from '../../theme'

type HeaderProps = {
  userName?: string | null
}
export const Header = ({ userName }: HeaderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const handleClickLogo = async () => {
    await router.push('/')
  }
  const handleClickLoginBtn = async () => {
    await router.push('/login')
  }
  return (
    <Box backgroundColor="#E5E5E5" h="70px" w="100%">
      <Flex alignItems="center" gap="2" overflow="scroll">
        <Box borderRadius="full" boxSize="40px" m="3" mt="4" overflow="hidden">
          <Image
            alt="icon"
            height="40px"
            objectFit="cover"
            src={Logo}
            width="40px"
          />
        </Box>

        <Heading
          _hover={{ cursor: 'pointer' }}
          mt="1"
          onClick={handleClickLogo}
          size="lg"
        >
          {' '}
          DataScienceClub
        </Heading>

        <Spacer />

        <Flex alignItems="center" p={3}>
          {userName ? (
            <Text p="2">{userName}</Text>
          ) : (
            <Button
              colorScheme="orange"
              onClick={handleClickLoginBtn}
              size="xs"
            >
              ログイン
            </Button>
          )}

          <IconButton
            aria-label="メニュー"
            color={COLORS.orange}
            fontSize="2xl"
            icon={<HamburgerIcon />}
            onClick={onOpen}
            size="lg"
            variant="outline"
          />
        </Flex>
      </Flex>

      <Sidebar isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}
