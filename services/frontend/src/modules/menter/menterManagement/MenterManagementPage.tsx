import { Button, Container } from '@chakra-ui/react'
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete'
import { useMenterManagementPageQuery } from 'generates/graphql'
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  mentee: z
    .object({
      name: z.string(),
    })
    .array(),
  menter: z.string(),
})
type formValues = z.infer<typeof schema>
export const MenterManagementPage = () => {
  const { data, loading, error } = useMenterManagementPageQuery()
  const { control, watch, handleSubmit } = useForm<formValues>({
    resolver: zodResolver(schema),
  })
  const menter = watch('menter')
  const mentee = watch('mentee')
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
    <Container>
      <Controller
        control={control}
        name="menter"
        render={({ field }) => (
          <AutoComplete onChange={(value) => value && field.onChange(value)}>
            <AutoCompleteInput
              disabled={loading}
              // eslint-disable-next-line react/jsx-handler-names
              onChange={field.onChange}
              placeholder="Search..."
              value={field.value}
              variant="filled"
            />

            <AutoCompleteList>
              {data?.getRegularUsers.map((user) => (
                <AutoCompleteItem
                  key={user.id}
                  textTransform="capitalize"
                  value={user.name}
                >
                  {user.name}
                </AutoCompleteItem>
              ))}
            </AutoCompleteList>
          </AutoComplete>
        )}
      />

      {fields.map((_field, index) => (
        <Controller
          control={control}
          key={_field.id}
          name={`mentee.${index}`}
          render={({ field }) => (
            <AutoComplete onChange={(value) => value && field.onChange(value)}>
              <AutoCompleteInput
                disabled={loading}
                // eslint-disable-next-line react/jsx-handler-names
                onChange={field.onChange}
                placeholder="Search..."
                value={field.value}
                variant="filled"
              />

              <AutoCompleteList>
                {data?.getRegularUsers
                  .filter(
                    (user) =>
                      user.name !== menter &&
                      !mentee.map((m) => m.name).includes(user.name),
                  )
                  .map((user) => (
                    <AutoCompleteItem
                      key={user.id}
                      textTransform="capitalize"
                      value={user.name}
                    >
                      {user.name}
                    </AutoCompleteItem>
                  ))}
              </AutoCompleteList>
            </AutoComplete>
          )}
        />
      ))}

      <Button onClick={() => append({ name: '' })}>追加</Button>

      <Button onClick={() => remove(0)}>削除</Button>

      <Button onClick={handleSubmit(onSubmit)}>送信</Button>
    </Container>
  )
}
