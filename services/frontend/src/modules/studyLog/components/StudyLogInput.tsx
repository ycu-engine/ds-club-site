import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  StudyLogPageDocument,
  useStudyLog_StudyLogInputMutation,
} from '../../../generates/graphql'
import { COLORS } from '../../../theme'

type CreateStudyLogForm = {
  studiedAt: Date
  studyContent: string
  studyTime: number
}

type StudyLogInputProps = {
  userId: string
}
export const StudyLogInput = ({ userId }: StudyLogInputProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateStudyLogForm>()
  const toast = useToast()

  const [mutateCreateStudyLog, { error, loading }] =
    useStudyLog_StudyLogInputMutation({
      refetchQueries: [{ query: StudyLogPageDocument, variables: { userId } }],
    })

  const onSubmit: SubmitHandler<CreateStudyLogForm> = async (forms) => {
    await mutateCreateStudyLog({
      variables: {
        input: {
          ...forms,
          studiedAt: format(forms.studiedAt, 'yyyy-MM-dd'),
          userId: userId,
        },
      },
    })
    if (error) {
      toast({
        duration: 2000,
        isClosable: true,
        status: 'error',
        title: 'エラーが発生しました',
      })
    } else {
      toast({
        duration: 2000,
        isClosable: true,
        status: 'success',
        title: '学習記録を追加しました',
      })
      reset()
    }
  }
  return (
    <Box
      as="form"
      bg={COLORS.white}
      borderRadius="20px"
      borderWidth="2px"
      onSubmit={handleSubmit(onSubmit)}
      overflow="hidden"
      p="12px"
    >
      <FormControl isInvalid={errors.studyContent ? true : false} isRequired>
        <FormLabel fontWeight="semibold" htmlFor="studyContent">
          勉強内容
        </FormLabel>

        <Input
          id="studyContent"
          placeholder="勉強内容"
          {...register('studyContent', {
            required: 'この項目は必須です',
          })}
        />

        <FormErrorMessage>
          {errors.studyContent ? errors.studyContent.message : null}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.studyTime ? true : false} isRequired>
        <FormLabel fontWeight="semibold" htmlFor="studyTime">
          勉強時間
        </FormLabel>

        <Input
          id="studyTime"
          placeholder="勉強時間"
          type="number"
          {...register('studyTime', {
            max: 24 * 60,
            min: { message: '1分以上の時間を入力してください', value: 1 },
            required: 'この項目は必須です',
            valueAsNumber: true,
          })}
        />

        <FormErrorMessage>
          {errors.studyTime ? errors.studyTime.message : null}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.studiedAt ? true : false} isRequired>
        <FormLabel fontWeight="semibold" htmlFor="studiedAt">
          勉強日
        </FormLabel>

        <Input
          id="studiedAt"
          placeholder="勉強日"
          type="date"
          {...register('studiedAt', {
            required: 'この項目は必須です',
            validate: {
              dateRange: (value) =>
                (new Date(2000, 1, 1) < value &&
                  value < new Date(2100, 1, 1)) ||
                '2000年1月1日から2100年1月1日の間で入力してください',
            },
            valueAsDate: true,
          })}
        />

        <FormErrorMessage>
          {errors.studiedAt ? errors.studiedAt.message : null}
        </FormErrorMessage>
      </FormControl>

      <Center h="100%">
        <Button isLoading={loading} mt="12px" type="submit">
          追加
        </Button>
      </Center>
    </Box>
  )
}
