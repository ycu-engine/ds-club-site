import {
  Box,
  Button,
  Container,
  Flex,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { DefaultLayout } from '../components/Layout/DefaultLayout'

import { ErrorMessage } from '@hookform/error-message'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import Logo from '../assets/images/icon.png'
import { auth } from '../clients/firebase'
import { InputBox } from '../components/InputForm/InputBox'
import { InputPasswordBox } from '../components/InputForm/InputPasswordBox'
import Head from 'next/head'

type LoginForm = {
  email: string
  password: string
}

const Page = () => {
  const [signInWithEmailAndPassword, _user, loading, error] =
    useSignInWithEmailAndPassword(auth)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>()
  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    console.debug(data)
    await signInWithEmailAndPassword(data.email, data.password)
    router.back()
  }

  return (
    <DefaultLayout authenticated={false} hideHeader>
      <Head>
        <title>ログイン</title>
      </Head>

      <Container mt="5%" w="100%">
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
            px={8}
            py={12}
            w="80%"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputBox
                title="ユーザー名"
                {...register('email', { required: '必須項目です' })}
              />

              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => (
                  <p style={{ color: 'red' }}>{message}</p>
                )}
              />

              <InputPasswordBox
                title="パスワード"
                {...register('password', {
                  required: '必須項目です',
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
                isDisabled={loading}
                isLoading={isSubmitting}
                mt="10"
                type="submit"
                w="100%"
              >
                サインイン
              </Button>

              {error ? <p>ログインに失敗しました</p> : null}
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

            <NextLink href="/trial-application" passHref>
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
