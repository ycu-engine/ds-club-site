import {
  Button,
  Container,
  FormLabel,
  Flex,
  IconButton,
  useToast,
} from '@chakra-ui/react'

import {
  useMenterManagementPageQuery,
  useMenterManagementPage_CreateMenterGroupMutation,
} from 'generates/graphql'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserAutoComplete } from 'components/InputForm/UserAutoComplete'
import { DeleteIcon, AddIcon } from '@chakra-ui/icons'

const schema = z.object({
  mentee: z
    .object({
      name: z.string().min(1),
    })
    .array()
    .min(1),
  menter: z.string().min(1),
})
type formValues = z.infer<typeof schema>
export const MenterManagementPage = () => {
  const toast = useToast()
  const {
    data,
    loading: queryLoading,
    error: queryError,
  } = useMenterManagementPageQuery()
  const [
    menterManagementPageCreateMenterGroupMutation,
    { loading: mutateLoading },
  ] = useMenterManagementPage_CreateMenterGroupMutation({
    onCompleted: () => {
      toast({
        duration: 5000,
        isClosable: true,
        status: 'success',
        title: 'メンターを登録しました',
      })
    },
    onError: (error) => {
      toast({
        duration: 5000,
        isClosable: true,
        status: 'error',
        title: error.message,
      })
    },
  })
  const { control, watch, handleSubmit } = useForm<formValues>({
    resolver: zodResolver(schema),
  })
  const menter = watch('menter')
  const mentee = watch('mentee')?.map((m) => m.name)

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'mentee',
  })
  const onSubmit: SubmitHandler<formValues> = async () => {
    await menterManagementPageCreateMenterGroupMutation({
      variables: {
        input: {
          // 変換する
          menteeIds: mentee.map((m) => {
            const user =
              data?.getRegularUsers.find((u) => u.name === m) ||
              data?.getTrialUsers.find((u) => u.name === m)
            return user?.id || ''
          }),
          menterId:
            data?.getRegularUsers.find((u) => u.name === menter)?.id || '',
        },
      },
    })
  }
  if (queryError) {
    return <>エラーが発生しました</>
  }
  return (
    <Container bg="white" borderRadius="md" boxShadow="md" mt="2" p="5">
      <FormLabel>メンター</FormLabel>

      <UserAutoComplete<formValues>
        control={control}
        isDisabled={queryLoading}
        name="menter"
        users={data?.getRegularUsers}
      />

      <FormLabel>メンティー</FormLabel>

      {fields.map((field, index) => (
        <Flex key={field.id} py="2">
          <UserAutoComplete<formValues>
            control={control}
            isDisabled={queryLoading}
            name={`mentee[${index}].name`}
            // 選択済みユーザーを除外する
            users={data?.getRegularUsers.filter(
              (user) => user.name !== menter && !mentee.includes(user.name),
            )}
          />

          <IconButton
            aria-label="remove"
            colorScheme="red"
            icon={<DeleteIcon />}
            onClick={() => remove(index)}
          />
        </Flex>
      ))}

      <Flex justifyContent="space-between" mt="3">
        <IconButton
          aria-label="add"
          colorScheme="blue"
          icon={<AddIcon />}
          onClick={() => append({ name: '' })}
        />

        <Button isLoading={mutateLoading} onClick={handleSubmit(onSubmit)}>
          送信
        </Button>
      </Flex>
    </Container>
  )
}
