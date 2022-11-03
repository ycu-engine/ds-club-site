import { Box, FormLabel, Select } from '@chakra-ui/react'
import { Control, Controller } from 'react-hook-form'

type MaterialSelecterProps = {
  control: Control<{ material: string | undefined }>
  materials: {
    id: string
    name: string
  }[]
}
export const MaterialSelecter = ({
  control,
  materials,
}: MaterialSelecterProps) => {
  return (
    <Box w="50%">
      <FormLabel fontWeight="semibold">選択した教材</FormLabel>

      <Controller
        control={control}
        name="material"
        render={({ field: { value, onChange } }) => (
          <Select
            bg="gray.300"
            onChange={onChange}
            placeholder="教材を選択"
            value={value}
          >
            {materials.map((material) => (
              <option key={material.id} value={material.id}>
                {material.name}
              </option>
            ))}
          </Select>
        )}
      />
    </Box>
  )
}
