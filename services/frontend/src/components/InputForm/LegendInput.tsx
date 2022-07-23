import type { ReactNode } from 'react'
import { Input, FormLabel, Box, forwardRef } from '@chakra-ui/react'
import type { InputProps } from '@chakra-ui/react'

type LegendInputProps = InputProps & {
  legend: ReactNode // <- これは 文字列でもOKだし、 JSX でもOKっていう意味
}

export const LegendInput = forwardRef<LegendInputProps, 'input'>(
  ({ legend, ...props }, ref) => {
    return (
      <Box>
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
