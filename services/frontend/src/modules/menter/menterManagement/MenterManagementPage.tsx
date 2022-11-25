import {
  Button,
  Container,
  FormLabel,
  Flex,
  IconButton,
} from '@chakra-ui/react'

import { useMenterManagementPageQuery } from 'generates/graphql'
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
    .array(),
  menter: z.string().min(1),
})
type formValues = z.infer<typeof schema>
export const MenterManagementPage = () => {
  const { data, loading, error } = useMenterManagementPageQuery()
  const { control, watch, handleSubmit } = useForm<formValues>({
    resolver: zodResolver(schema),
  })
  const menter = watch('menter')
  const mentee = watch('mentee')?.map((m) => m.name)

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'mentee',
  })
  const onSubmit: SubmitHandler<formValues> = (form) => {
    console.info(form)
  }
  if (error) {
    return <>エラーが発生しました</>
  }
  return (
    <Container bg="white" borderRadius="md" boxShadow="md" mt="2" p="5">
      <FormLabel>メンター</FormLabel>

      <UserAutoComplete<formValues>
        control={control}
        isDisabled={loading}
        name="menter"
        users={data?.getRegularUsers}
      />

      <FormLabel>メンティー</FormLabel>

      {fields.map((field, index) => (
        <Flex key={field.id} py="2">
          <UserAutoComplete<formValues>
            control={control}
            isDisabled={loading}
            name={`mentee[${index}].name`}
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

        <Button onClick={handleSubmit(onSubmit)}>送信</Button>
      </Flex>
    </Container>
  )
}
