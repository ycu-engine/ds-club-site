import { Box, Container, Heading, VStack } from '@chakra-ui/react'
import { ErrorMessage } from '@hookform/error-message'
import type { FieldValues, SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { DefaultLayout } from '../components/DefaultLayout'

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.debug(data)
  }

  type inputBoxProps = {
    title: string
    type: string
    registerName: string
    pattern: RegExp
    required: boolean
  }

  const inputBox = (props: inputBoxProps) => {
    const { title, type, registerName, pattern, required } = props
    return (
      <Box
        bg="white"
        borderColor="black"
        borderRadius="24"
        px="2"
        py="2"
        w="100%"
      >
        {title}

        <input
          style={{
            border: '1px solid',
            borderRadius: '0.5rem',
            padding: '0.5rem',
            width: '100%',
          }}
          type={type}
          {...register(registerName, {
            maxLength: 80,
            pattern: {
              message: '正しいメールアドレスを入力してください',
              value: pattern,
            },
            required: { message: '必須項目です', value: required },
          })}
        />

        <ErrorMessage
          errors={errors}
          name={registerName}
          render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
        />
      </Box>
    )
  }

  return (
    <DefaultLayout hideHeader>
      <Heading p="10">体験入会申請フォーム</Heading>

      <Container fontSize="1em" w="100%">
        <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: 'center' }}>
          <Box
            alignItems="center"
            bg="white"
            borderRadius="1.5rem"
            mx="auto"
            my="1rem"
            p="1.5rem"
            w="80%"
          >
            <VStack spacing="1px">
              {inputBox({
                pattern: /.*/,
                registerName: 'name',
                required: true,
                title: 'お名前',
                type: 'text',
              })}

              {inputBox({
                pattern:
                  /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                registerName: 'Email',
                required: true,
                title: 'メールアドレス',
                type: 'text',
              })}

              {inputBox({
                pattern: /.*/,
                registerName: 'affiliation',
                required: false,
                title: '学校・学部・学科名・学年',
                type: 'text',
              })}

              {inputBox({
                pattern: /.*/,
                registerName: 'password',
                required: true,
                title: 'パスワード',
                type: 'password',
              })}

              {inputBox({
                pattern: /.*/,
                registerName: 'confirmPassword',
                required: true,
                title: 'パスワード（確認用）',
                type: 'password',
              })}
            </VStack>
          </Box>

          <input
            style={{
              backgroundColor: 'orange',
              borderRadius: '0.5rem',
              fontSize: '1.3rem',
              fontWeight: 'bold',
              padding: '0.5rem',
              width: '80%',
            }}
            type="submit"
            value="確認ページへ"
          />
        </form>
      </Container>
    </DefaultLayout>
  )
}
export default Page
