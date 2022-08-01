import type { ReactNode } from 'react'
import { Input, FormLabel, Box, forwardRef } from '@chakra-ui/react'
import type { InputProps } from '@chakra-ui/react'

type LegendInputProps = InputProps & {
  legend: ReactNode
}
export const LegendInput = forwardRef<LegendInputProps, 'input'>(
  ({ legend, ...props }, ref) => {
    return (
      <Box p="3">
        <FormLabel as="legend">{legend}</FormLabel>

        <Input
          outlineColor="black"
          placeholder="入力"
          ref={ref}
          size="sm"
          type="text"
          {...props}
        />
      </Box>
    )
  },
)
