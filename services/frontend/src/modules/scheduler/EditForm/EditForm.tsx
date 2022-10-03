import {
  Button,
  VStack,
  Input,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Checkbox,
  useToast,
} from '@chakra-ui/react'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { SubmitHandler, useForm } from 'react-hook-form'
import { auth } from '../../../clients/firebase'
import {
  useEditForm_CreateEventMutation,
  useEditForm_CreateWeeklyRepeatEventInputMutation,
} from '../../../generates/graphql'
import { RefetchQueryContext } from '../../../pages'

type EditFormValues = {
  title: string
  location: string
  start: Date
  end: Date
  repeatUntil?: Date
}
export const EditForm = () => {
  const [user, _loading] = useAuthState(auth)
  const refetchQuery = useContext(RefetchQueryContext)
  const [mutateCreateEvent] = useEditForm_CreateEventMutation({
    refetchQueries: [{ query: refetchQuery }],
  })

  const [mutateCreateWeeklyRepeatEvent] =
    useEditForm_CreateWeeklyRepeatEventInputMutation({
      refetchQueries: [
        { query: refetchQuery, variables: { userId: user?.uid || '' } },
      ],
    })

  const [isCheckedRepeat, setIsCheckedRepeat] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    resetField,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<EditFormValues>()

  const toast = useToast()

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      resetField('repeatUntil')
    }
    setIsCheckedRepeat(e.target.checked)
  }

  const onSubmit: SubmitHandler<EditFormValues> = async (data) => {
    const { start, end, repeatUntil } = data
    const validData = {
      ...data,
      end: new Date(end).toISOString(),
      repeatUntil: repeatUntil
        ? new Date(repeatUntil).toISOString()
        : undefined,
      start: new Date(start).toISOString(),
    }
    if (isCheckedRepeat) {
      await mutateCreateWeeklyRepeatEvent({
        variables: {
          input: validData,
        },
      })
    } else {
      await mutateCreateEvent({
        variables: {
          input: validData,
        },
      })
    }
    reset()
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      toast({
        duration: 2000,
        isClosable: true,
        status: 'success',
        title: '予定を追加しました',
      })
    }
  }, [isSubmitSuccessful, toast])

  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={3} w="100%">
      <FormControl isInvalid={errors.title ? true : false}>
        <FormLabel fontWeight="semibold" htmlFor="title">
          件名
        </FormLabel>

        <Input
          id="title"
          placeholder="件名"
          {...register('title', {
            required: 'この項目は必須です',
          })}
        />

        <FormErrorMessage>
          {errors.title ? errors.title.message : null}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.location ? true : false}>
        <FormLabel fontWeight="semibold" htmlFor="location">
          場所
        </FormLabel>

        <Input
          id="location"
          placeholder="場所"
          {...register('location', {
            required: 'この項目は必須です',
          })}
        />

        <FormErrorMessage>
          {errors.location ? errors.location.message : null}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.start ? true : false}>
        <FormLabel fontWeight="semibold" htmlFor="start">
          開始日時
        </FormLabel>

        <Input
          id="start"
          placeholder="開始日時"
          type="datetime-local"
          {...register('start', {
            required: 'この項目は必須です',
            validate: {
              isAfter: (value) => {
                return (
                  new Date(value) > new Date() ||
                  '開始日時は現在時刻より後の日時を指定してください'
                )
              },
              tooFuture: (value) => {
                return (
                  new Date(2200, 1, 1) > new Date(value) || '未来すぎませんか？'
                )
              },
            },
          })}
        />

        <FormErrorMessage>
          {errors.start ? errors.start.message : null}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.end ? true : false}>
        <FormLabel fontWeight="semibold" htmlFor="end">
          終了日時
        </FormLabel>

        <Input
          id="end"
          placeholder="終了日時"
          type="datetime-local"
          {...register('end', {
            required: 'この項目は必須です',
            validate: (value) => {
              const { start } = getValues()
              return (
                new Date(value) > new Date(start) ||
                '終了日時は開始日時よりも後に設定してください'
              )
            },
          })}
        />

        <FormErrorMessage>
          {errors.end ? errors.end.message : null}
        </FormErrorMessage>
      </FormControl>

      <Checkbox isChecked={isCheckedRepeat} onChange={handleCheckboxChange}>
        繰り返しのイベントを登録する
      </Checkbox>

      {isCheckedRepeat ? (
        <FormControl isInvalid={errors.repeatUntil ? true : false}>
          <FormLabel fontWeight="semibold" htmlFor="repeatUntil">
            繰り返しの終了日(終了日は繰り返しに含まれません)
          </FormLabel>

          <Input
            id="repeatUntil"
            placeholder="繰り返しの終了日(終了日は繰り返しに含まれません)"
            type="date"
            {...register('repeatUntil', {
              required: isCheckedRepeat ? 'この項目は必須です' : false,
              validate: {
                afterEnd: (value) => {
                  if (!value) return false
                  const { end } = getValues()
                  return (
                    new Date(value) > new Date(end) ||
                    '繰り返しの終了日は終了日時よりも後に設定してください'
                  )
                },
                repeatRange: (value) => {
                  if (!value) return false
                  const { start } = getValues()
                  return (
                    new Date(value).getTime() - new Date(start).getTime() <=
                      1000 * 60 * 60 * 24 * 90 ||
                    '繰り返しの終了日時は開始日時から90日以内に設定してください'
                  )
                },
              },
            })}
          />

          <FormErrorMessage>
            {errors.repeatUntil ? errors.repeatUntil.message : null}
          </FormErrorMessage>
        </FormControl>
      ) : null}

      <Button
        colorScheme="teal"
        isLoading={isSubmitting}
        size="md"
        type="submit"
      >
        予定を登録
      </Button>
    </VStack>
  )
}
