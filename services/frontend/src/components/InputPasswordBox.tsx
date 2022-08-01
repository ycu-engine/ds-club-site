import type { InputProps } from '@chakra-ui/react'
import {
  Box,
  Button,
  forwardRef,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { useState } from 'react'

type InputPasswordBoxProps = InputProps & {
  title: ReactNode
}

export const InputPasswordBox = forwardRef<InputPasswordBoxProps, 'input'>(
  ({ title, ...props }, ref) => {
    const [isHidden, setIsHidden] = useState(true)
    return (
      <Box bg="white" px="2" py="2" w="100%">
        {title}

        <InputGroup>
          <Input
            borderColor="black"
            type={isHidden ? 'password' : 'text'}
            {...props}
            ref={ref}
          />

          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              onClick={() => {
                setIsHidden(!isHidden)
              }}
              p="1"
              size="sm"
            >
              {isHidden ? '表示' : '非表示'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
    )
  },
)
