import React from 'react'
import { Input, FormLabel, Box } from '@chakra-ui/react'
import type { As } from '@chakra-ui/react'
import type { UseFormRegisterReturn } from 'react-hook-form'

type LegendInputProps = {
  as?: As
  legendValue: string
  outlineColor?: string
  placeholder?: string
  size?: string
  type?: React.HTMLInputTypeAttribute
  register: UseFormRegisterReturn
}
export const LegendInput = ({
  legendValue,
  as = Input,
  outlineColor = 'black',
  placeholder = '入力',
  type = 'text',
  size = 'sm',
  register,
}: LegendInputProps) => {
  return (
    <Box>
      <FormLabel as="legend">{legendValue}</FormLabel>

      <Input
        as={as}
        outlineColor={outlineColor}
        placeholder={placeholder}
        size={size}
        type={type}
        {...register}
      />
    </Box>
  )
}
