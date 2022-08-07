import { Box, Button, Container, Heading, VStack } from '@chakra-ui/react'
import { ErrorMessage } from '@hookform/error-message'
import { useRouter } from 'next/router'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { DefaultLayout } from '../components/DefaultLayout'
import { InputBox } from '../components/InputForm/InputBox'
import { InputPasswordBox } from '../components/InputForm/InputPasswordBox'

type FormValues = {
  name: string
  mail: string
  affiliation: string
  password: string
  confirmPassword: string
}

const Page = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>()

  const router = useRouter()

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.debug(data)
    void router.push('/')
  }

  return (
    <DefaultLayout hideHeader>
      <Heading p="10">体験入会申請フォーム</Heading>

      <Container fontSize="1em" w="100%">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            bg="white"
            borderRadius="1.5rem"
            mx="auto"
            my="1rem"
            p="1.5rem"
            w="80%"
          >
            <VStack spacing="1px">
              <InputBox
                title="お名前"
                {...register('name', { required: '必須項目です' })}
              />

              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => (
                  <p style={{ color: 'red' }}>{message}</p>
                )}
              />

              <InputBox
                title="メールアドレス"
                {...register('mail', {
                  pattern: {
                    message: '正しいメールアドレスを入力してください',
                    value:
                      /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                  },
                  required: '必須項目です',
                })}
              />

              <ErrorMessage
                errors={errors}
                name="mail"
                render={({ message }) => (
                  <p style={{ color: 'red' }}>{message}</p>
                )}
              />

              <InputBox
                title="学校・学部・学科名・学年"
                {...register('affiliation', { required: '必須項目です' })}
              />

              <ErrorMessage
                errors={errors}
                name="affiliation"
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

              <InputPasswordBox
                title="パスワード（確認用）"
                {...register('confirmPassword', {
                  required: '必須項目です',
                  validate: (value) =>
                    value === watch('password') ||
                    'パスワードが一致していません',
                })}
              />

              <ErrorMessage
                errors={errors}
                name="confirmPassword"
                render={({ message }) => (
                  <p style={{ color: 'red' }}>{message}</p>
                )}
              />
            </VStack>
          </Box>

          <Box m="auto" w="70%">
            <Button
              colorScheme="orange"
              isLoading={isSubmitting}
              type="submit"
              w="100%"
            >
              確認ページへ
            </Button>
          </Box>
        </form>
      </Container>
    </DefaultLayout>
  )
}
export default Page
