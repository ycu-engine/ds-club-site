import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteList,
  AutoCompleteItem,
  AutoCompleteInputProps,
} from '@choc-ui/chakra-autocomplete'
import type { RegularUser, TrialUser } from 'generates/graphql'
import { type Control, Controller, FieldValues, Path } from 'react-hook-form'

type UserAutoCompleteProps<T extends FieldValues> = AutoCompleteInputProps & {
  name: string
  control: Control<T>
  users:
    | (Pick<RegularUser, 'id' | 'name'> | Pick<TrialUser, 'id' | 'name'>)[]
    | undefined
}
export const UserAutoComplete = <T extends FieldValues>({
  name,
  control,
  users,
  ...props
}: UserAutoCompleteProps<T>) => {
  return (
    <Controller
      control={control}
      name={name as Path<T>}
      render={({ field }) => (
        <AutoComplete
          onChange={(value) => value && field.onChange(value)}
          openOnFocus
        >
          <AutoCompleteInput
            // eslint-disable-next-line react/jsx-handler-names
            onChange={field.onChange}
            placeholder="ユーザーを検索…"
            value={field.value}
            variant="filled"
            {...props}
          />

          <AutoCompleteList>
            {users?.map((user) => (
              <AutoCompleteItem
                key={user['id']}
                textTransform="capitalize"
                value={user['name']}
              >
                {user['name']}
              </AutoCompleteItem>
            ))}
          </AutoCompleteList>
        </AutoComplete>
      )}
    />
  )
}
