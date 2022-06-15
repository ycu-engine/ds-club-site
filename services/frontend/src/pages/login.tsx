import { DefaultLayout } from "../components/DefaultLayout";
import { Box, Flex, Text, Input, Button, Link } from '@chakra-ui/react';
import { InputGroup, InputRightElement } from '@chakra-ui/react';
import React from 'react';

import Logo from '../assets/images/icon.png'
import Image from 'next/image'
import NextLink from 'next/link'

const ptb = 12;
const plr = 8;



const Page = () => {
  const [show, setShow] = React.useState(false)
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const handleClick = () => setShow(!show)

  const isInvalid = !username || !password

  return (
    <DefaultLayout>

      <Box px={10} pt={5}>



        <Flex as="form" direction='column' justify='center' align='center'>

          <Box borderRadius='full' overflow='hidden' boxSize="40px" m='3' mt='4' >
            <Image
              width='40px'
              height='40px'
              objectFit='cover'
              src={Logo}
              alt='icon'
            />
          </Box>

          <Text fontSize="4xl">こんにちは</Text>


          <Box background={"#FFFFFE"} h={400} w={350} pt={ptb} pb={ptb} pl={plr} pr={plr} borderRadius={10}>

            <Flex direction='column' justify='space-between' w="100%" h="87%">

              <Box>
                <Text >ユーザー名</Text>
                <Input value={username} onChange={e => { console.log("onchange", e.target.value); setUsername(e.target.value) }} required pr='4.5rem' placeholder='' />
              </Box>


              <Box h="45%">
                <Text  >パスワード</Text>
                {/* <Input placeholder='' mb={5} variant='flushed'></Input> */}

                <InputGroup size='md' mt={2}>
                  <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder=''
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' bg="#FF8E3C" color="#FFFFFE" onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>


              <Button type="submit" w="100%" h="15%" bg={isInvalid ? "#909090" : "#D9376E"} color="#FFFFFE" >サインイン</Button>

            </Flex>

            <NextLink href='https://datascienceclubjp.wixsite.com/home'
              fontSize='xs' m={1}>

              パスワードを忘れたら</NextLink>









          </Box>

          <Flex mt={4} direction='column' justify='center'>
            <Text lineHeight="3">活動に興味がありますか？</Text>



            <NextLink href="https://datascienceclubjp.wixsite.com/home/%E5%8F%82%E5%8A%A0%E7%94%B3%E3%81%97%E8%BE%BC%E3%81%BF"
              passHref>
              <Link fontSize='xs' color="#D9376E">
                体験入会をする
              </Link>
            </NextLink>
          </Flex>


        </Flex>

      </Box>



    </DefaultLayout>
  );
};

export default Page;
