import { DefaultLayout } from '../components/DefaultLayout'
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Link,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import React from 'react'

import Logo from '../assets/images/icon.png'
import Image from 'next/image'
import NextLink from 'next/link'

const ptb = 12
const plr = 8

const Page = () => {
  const [show, setShow] = React.useState(false)
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const handleClick = () => setShow(!show)

  const isInvalid = !username || !password

  return (
    <DefaultLayout hideHeader={true}>
      <Box pt={5} px={10}>
        <Flex align="center" as="form" direction="column" justify="center">
          <Box
            borderRadius="full"
            boxSize="40px"
            m="3"
            mt="4"
            overflow="hidden"
          >
            <Image
              alt="icon"
              height="40px"
              objectFit="cover"
              src={Logo}
              width="40px"
            />
          </Box>

          <Text fontSize="4xl">こんにちは</Text>

          <Box
            background="#FFFFFE"
            borderRadius={10}
            h={400}
            pb={ptb}
            pl={plr}
            pr={plr}
            pt={ptb}
            w={350}
          >
            <Flex direction="column" h="87%" justify="space-between" w="100%">
              <Box>
                <Text>ユーザー名</Text>

                <Input
                  onChange={(e) => {
                    setUsername(e.target.value)
                  }}
                  placeholder=""
                  pr="4.5rem"
                  required
                  value={username}
                />
              </Box>

              <Box h="45%">
                <Text>パスワード</Text>

                {/* <Input placeholder='' mb={5} variant='flushed'></Input> */}

                <InputGroup mt={2} size="md">
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=""
                    pr="4.5rem"
                    required
                    type={show ? 'text' : 'password'}
                    value={password}
                  />

                  <InputRightElement width="4.5rem">
                    <Button
                      bg="#FF8E3C"
                      color="#FFFFFE"
                      h="1.75rem"
                      onClick={handleClick}
                      size="sm"
                    >
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>

              <Button
                bg={isInvalid ? '#909090' : '#D9376E'}
                color="#FFFFFE"
                h="15%"
                type="submit"
                w="100%"
              >
                サインイン
              </Button>
            </Flex>

            <NextLink
              fontSize="xs"
              href="https://datascienceclubjp.wixsite.com/home"
              m={1}
            >
              パスワードを忘れたら
            </NextLink>
          </Box>

          <Flex direction="column" justify="center" mt={4}>
            <Text lineHeight="3">活動に興味がありますか？</Text>

            <NextLink
              href="https://datascienceclubjp.wixsite.com/home/%E5%8F%82%E5%8A%A0%E7%94%B3%E3%81%97%E8%BE%BC%E3%81%BF"
              passHref
            >
              <Link color="#D9376E" fontSize="xs">
                体験入会をする
              </Link>
            </NextLink>
          </Flex>
        </Flex>
      </Box>
    </DefaultLayout>
  )
}

export default Page
