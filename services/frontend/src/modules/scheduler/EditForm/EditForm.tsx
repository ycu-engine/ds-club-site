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
import { ChangeEvent, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type EditFormValues = {
  title: string
  location: string
  start: Date
  end: Date
  repeatUntil?: Date
}
export const EditForm = () => {
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

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      resetField('repeatUntil')
    }
    setIsCheckedRepeat(e.target.checked)
  }

  const onSubmit: SubmitHandler<EditFormValues> = (data) => {
    const { start, end, repeatUntil } = data
    const validData = {
      ...data,
      end: new Date(end).toISOString(),
      repeatUntil: repeatUntil
        ? new Date(repeatUntil).toISOString()
        : undefined,
      start: new Date(start).toISOString(),
    }
    console.info(validData)
    reset()
  }

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
            validate: (value) => {
              return (
                new Date(value) > new Date() ||
                '開始日時は現在時刻より後の日時を指定してください'
              )
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
            繰り返しの終了日時
          </FormLabel>

          <Input
            id="repeatUntil"
            placeholder="繰り返しの終了日時"
            type="datetime-local"
            {...register('repeatUntil')}
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
