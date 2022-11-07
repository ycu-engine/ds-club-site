import {
  Box,
  Button,
  Container,
  Heading,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { ErrorMessage } from '@hookform/error-message'
import { useRouter } from 'next/router'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { DefaultLayout } from '../../../components/Layout/DefaultLayout'
import { InputBox } from '../../../components/InputForm/InputBox'
import { useSubmitTrialApplicationPage_SubmitTrialApplicationMutation } from '../../../generates/graphql'
import { ConfirmDialog } from '../ConfirmationDialog'

export type TrialApplicationForm = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
  affiliation: string
}

export const SubmitTrialApplicationPage = () => {
  const [mutateSubmitTrialApplication, { loading }] =
    useSubmitTrialApplicationPage_SubmitTrialApplicationMutation({})
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const {
    register,
    formState: { errors },
    trigger,
    handleSubmit,
    reset,
    getValues,
  } = useForm<TrialApplicationForm>({})
  // ConfirmDialogで使用するために、フォームのIdを設定しておく
  const formId = 'trial-application-form'

  const onSubmit: SubmitHandler<TrialApplicationForm> = async (forms) => {
    const { data } = await mutateSubmitTrialApplication({
      onCompleted: () => {
        reset()
        toast({
          description:
            '運営の承認後、ログインが可能になります。メールをご確認ください。',
          duration: 30000,
          isClosable: true,
          status: 'success',
          title: '登録完了です',
        })
        setTimeout(() => {
          void router.push('/')
        }, 3000)
      },
      onError: (error) => {
        toast({
          description: error.message,
          duration: 9000,
          isClosable: true,
          status: 'error',
          title: 'エラー',
        })
      },
      variables: {
        input: forms,
      },
    })
    console.info(data)
  }

  const handleClickConfirmDialogBtn = async () => {
    const isOk = await trigger()
    if (isOk) {
      onOpen()
    }
  }

  return (
    <DefaultLayout authenticated={false} hideHeader>
      <Heading p="10">体験入会申請フォーム</Heading>

      <Container fontSize="1em" maxWidth="container.md">
        <Box
          as="form"
          bg="white"
          borderRadius="1.5rem"
          id={formId}
          mx="auto"
          my="1rem"
          p="1.5rem"
          w="80%"
        >
          <VStack spacing="1px">
            <InputBox
              placeholder="例) 山田 太郎"
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
              title="メールアドレス（学校推奨）"
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
              title="パスワード"
              type="password"
              {...register('password', {
                minLength: {
                  message: 'パスワードは8文字以上で入力してください',
                  value: 8,
                },
                pattern: {
                  message: '半角英数字を含むパスワードを入力してください',
                  value: /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,
                },
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

            <InputBox
              title="パスワード（確認用）"
              type="password"
              {...register('passwordConfirmation', {
                required: '必須項目です',
                validate: (value) =>
                  value === getValues('password') || 'パスワードが一致しません',
              })}
            />

            <ErrorMessage
              errors={errors}
              name="passwordConfirmation"
              render={({ message }) => (
                <p style={{ color: 'red' }}>{message}</p>
              )}
            />

            <InputBox
              fontSize="0.9em"
              placeholder="例) 横浜市立大学・データサイエンス学部・データサイエンス学科・1学年"
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
            onClick={handleClickConfirmDialogBtn}
            w="100%"
          >
            確認画面へ
          </Button>

          <ConfirmDialog
            formId={formId}
            isLoading={loading}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit(onSubmit)}
            trialApplicationInfo={getValues()}
          />
        </Box>
      </Container>
    </DefaultLayout>
  )
}
