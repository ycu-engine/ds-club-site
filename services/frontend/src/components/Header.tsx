import {
  Box,
  Text,
  Flex,
  Spacer,
  Heading,
  Button,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  VStack,
  Container,
} from '@chakra-ui/react'

import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'

import Logo from '../assets/images/icon.png'

import Image from 'next/image'

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const button_texts = ['個人ページ', '週目標', '教材', 'テスト', '資料']

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

      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />

        <DrawerContent>
          {/* サイドバーの要素はここから変更してください */}

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
    </Box>
  )
}
