import type { InputProps } from '@chakra-ui/react'
import { Box, forwardRef, Input } from '@chakra-ui/react'
import type { ReactNode } from 'react'

type InputBoxProps = InputProps & {
  title: ReactNode
}

export const InputBox = forwardRef<InputBoxProps, 'input'>(
  ({ title, ...props }, ref) => {
    return (
      <Box bg="white" px="2" py="2" w="100%">
        {title}

        <Input borderColor="black" type="text" {...props} ref={ref} />
      </Box>
    )
  },
)
