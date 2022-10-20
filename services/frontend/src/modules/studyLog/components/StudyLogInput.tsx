import { Box, Button, Center } from '@chakra-ui/react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { SubmitHandler, useForm } from 'react-hook-form'
import { auth } from '../../../clients/firebase'
import { InputBox } from '../../../components/InputForm/InputBox'
import {
  StudyLogPageDocument,
  useStudyLogPage_CreateStudyLogMutation,
} from '../../../generates/graphql'

type CreateStudyLogForm = {
  studiedAt: Date
  studyContent: string
  studyTime: number
}

export const StudyLogInput = () => {
  const { register, handleSubmit } = useForm<CreateStudyLogForm>()

  const [user] = useAuthState(auth)

  const [mutateCreateStudyLog] = useStudyLogPage_CreateStudyLogMutation({
    refetchQueries: [
      { query: StudyLogPageDocument, variables: { userId: user?.uid } },
    ],
  })

  const onSubmit: SubmitHandler<CreateStudyLogForm> = async (forms) => {
    console.debug(forms)
    await mutateCreateStudyLog({
      variables: {
        input: {
          studiedAt: forms.studiedAt.toISOString().slice(0, 10),
          studyContent: forms.studyContent,
          studyTime: forms.studyTime,
        },
      },
    })
  }
  return (
    <Box
      as="form"
      bg="white"
      borderRadius="20px"
      borderWidth="2px"
      m="12px"
      onSubmit={handleSubmit(onSubmit)}
      overflow="hidden"
      p="12px"
    >
      <InputBox title="勉強内容" {...register('studyContent')} />

      <InputBox
        title="勉強時間(分)"
        type="number"
        {...register('studyTime', {
          required: '必須項目です',
          valueAsNumber: true,
        })}
      />

      <InputBox
        title="学習日"
        type="date"
        {...register('studiedAt', {
          required: '必須項目です',
          valueAsDate: true,
        })}
      />

      <Center h="100%">
        <Button mt="12px" type="submit">
          追加
        </Button>
      </Center>
    </Box>
  )
}
