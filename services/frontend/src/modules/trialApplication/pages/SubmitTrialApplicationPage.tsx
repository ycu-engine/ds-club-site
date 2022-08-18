import {
  Box,
  Button,
  Container,
  Heading,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { ErrorMessage } from '@hookform/error-message'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { DefaultLayout } from '../../../components/DefaultLayout'
import { InputBox } from '../../../components/InputForm/InputBox'
import { useSubmitTrialApplicationPage_SubmitTrialApplicationMutation } from '../../../generates/graphql'

type TrialApplicationForm = {
  name: string
  email: string
  affiliation: string
}

export const SubmitTrialApplicationPage = () => {
  const [mutateSubmitTrialApplication] =
    useSubmitTrialApplicationPage_SubmitTrialApplicationMutation({})
  const toast = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TrialApplicationForm>()

  const onSubmit: SubmitHandler<TrialApplicationForm> = async (forms) => {
    const { data } = await mutateSubmitTrialApplication({
      variables: {
        input: forms,
      },
    })
    if (data?.submitTrialApplication) {
      reset()
      toast({
        description: 'これからよろしくね〜〜',
        duration: 9000,
        isClosable: true,
        status: 'success',
        title: '登録完了です',
      })
    }
  }

  return (
    <DefaultLayout authenticated={false} hideHeader>
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
                {...register('email', {
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
                name="email"
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
