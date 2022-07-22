import { Box, Button, Container, Heading, VStack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { DefaultLayout } from '../components/DefaultLayout'

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => console.log(data)
  console.log(errors)

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
      <Container>
        {title}

        <Box
          bg="white"
          borderColor="black"
          borderRadius="24"
          px="2"
          py="2"
          w="100%"
        >
          <input
            height={100}
            size={60}
            type={type}
            {...register(registerName, {
              maxLength: 80,
              pattern: pattern,
              required: required,
            })}
          />
        </Box>
      </Container>
    )
  }

  return (
    <DefaultLayout hideHeader>
      <Heading p="10">体験入会申請フォーム</Heading>

      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box bg="white" borderRadius="24" py="5">
            <VStack spacing="1px">
              {inputBox({
                pattern: /.*/,
                registerName: 'name',
                required: false,
                title: 'お名前',
                type: 'text',
              })}

              {inputBox({
                pattern: /.*/,
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
                type: 'text',
              })}

              {inputBox({
                pattern: /.*/,
                registerName: 'confirmPassword',
                required: true,
                title: 'パスワード（確認用）',
                type: 'text',
              })}
            </VStack>
          </Box>

          <Button _hover={{ bg: '#ffa77a' }} colorScheme="orange" w="100%">
            <input type="submit" />
            確認ページへ
          </Button>
        </form>
      </Container>
    </DefaultLayout>
  )
}
export default Page
