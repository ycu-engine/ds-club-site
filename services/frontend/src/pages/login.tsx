import {
  Box,
  Button,
  Container,
  Flex,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react'
import { DefaultLayout } from '../components/DefaultLayout'

import { ErrorMessage } from '@hookform/error-message'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import Logo from '../assets/images/icon.png'
import { InputBox } from '../components/InputForm/InputBox'
import { InputPasswordBox } from '../components/InputForm/InputPasswordBox'

const ptb = 12
const plr = 8

type LoginForm = {
  userName: string
  password: string
}

const Page = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>()
  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    console.debug(data)
    await router.push('/')
  }

  return (
    <DefaultLayout hideHeader>
      <Container mt="5%" w="100%">
        {/* <Flex align="center" as="form" direction="column" justify="center"> */}

        <VStack align="center">
          <Image
            alt="icon"
            height="40px"
            objectFit="cover"
            src={Logo}
            style={{ borderRadius: '100%' }}
            width="40px"
          />

          <Text fontSize="4xl">こんにちは</Text>

          <Box
            background="#FFFFFE"
            borderRadius={10}
            h={400}
            pb={ptb}
            pl={plr}
            pr={plr}
            pt={ptb}
            w="80%"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputBox
                title="ユーザー名"
                {...register('userName', { required: '必須項目です' })}
              />

              <ErrorMessage
                errors={errors}
                name="userName"
                render={({ message }) => (
                  <p style={{ color: 'red' }}>{message}</p>
                )}
              />

              <InputPasswordBox
                title="パスワード"
                {...register('password', {
                  required: '必須項目です',
                  validate: (value) =>
                    // いつかデータベースに登録したパスワードをとってこれるようにしたい
                    value === 'aiueo' || '正しいパスワードを入力してください',
                })}
              />

              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => (
                  <p style={{ color: 'red' }}>{message}</p>
                )}
              />

              <Button
                color="#FFFFFE"
                colorScheme="orange"
                isLoading={isSubmitting}
                mt="10"
                type="submit"
                w="100%"
              >
                サインイン
              </Button>
            </form>

            <NextLink
              href="https://datascienceclubjp.wixsite.com/home"
              passHref
            >
              <Link fontSize="xs" m={1}>
                パスワードを忘れたら
              </Link>
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
        </VStack>

        {/* </Flex> */}
      </Container>
    </DefaultLayout>
  )
}

export default Page
