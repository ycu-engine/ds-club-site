import {
  Box,
  Text,
  Flex,
  Spacer,
  Heading,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react'

import { HamburgerIcon } from '@chakra-ui/icons'

import Logo from '../assets/images/icon.png'

import Image from 'next/image'
import { Sidebar } from './Sidebar'

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box backgroundColor="#E5E5E5" h="70px" w="100%">
      <Flex alignItems="center" gap="2" overflow="scroll">
        <Box borderRadius="full" boxSize="40px" m="3" mt="4" overflow="hidden">
          {/* デーサイクラブの画像 */}

          <Image
            alt="icon"
            height="40px"
            objectFit="cover"
            // p='2' m='2'
            //   borderRadius='full'
            //   boxSize='60px'
            src={Logo}
            width="40px"
          />
        </Box>

        <Heading mt="1" size="lg">
          {' '}
          DataScienceClub
        </Heading>

        <Spacer />

        {/* 会員名とドロワーのボタン */}

        <Flex alignItems="center" p={3}>
          {/* 会員名 */}

          <Text p="2">Kakeru Sato</Text>

          {/* ハンバーガーボタン */}

          <IconButton
            aria-label="メニュー"
            color="#FF8E3C"
            icon={<HamburgerIcon />}
            onClick={onOpen}
            size="sm"
            variant="outline"
          />
        </Flex>
      </Flex>

      {/* サイドバーの画面 */}

      <Sidebar isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}
