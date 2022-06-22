import {
  Box,
  Text,
  Flex,
  Spacer,
  Heading,
  Menu,
  IconButton,
} from '@chakra-ui/react'

import { HamburgerIcon } from '@chakra-ui/icons'

import Logo from '../assets/images/icon.png'

import Image from 'next/image'

type HeaderProps = {
  onClickMenu: () => unknown
}

export const Header = ({ onClickMenu }: HeaderProps) => {
  return (
    <Box backgroundColor="#E5E5E5" h="70px" w="100%">
      <Flex alignItems="center" gap="2" minWidth="max-content">
        <Box borderRadius="full" boxSize="40px" m="3" mt="4" overflow="hidden">
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

        <Box p="1">
          <Heading mt="1" size="lg">
            {' '}
            DataScienceClub
          </Heading>
        </Box>

        <Spacer />

        <Box>
          <Text p="2">Kakeru Sato</Text>
        </Box>

        <Box>
          <IconButton
            aria-label="メニュー"
            boxSize="2"
            color="#FF8E3C"
            icon={<HamburgerIcon />}
            onClick={onClickMenu}
            variant="outline"
          />
        </Box>
      </Flex>
    </Box>
  )
}
