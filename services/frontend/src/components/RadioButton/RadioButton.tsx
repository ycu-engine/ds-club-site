import type { UseRadioProps } from '@chakra-ui/react'
import { Box, chakra, useRadio, Text } from '@chakra-ui/react'

type RadioButtonProps = {
  text: string
} & UseRadioProps
export const RadioButton = ({ text, ...radioProps }: RadioButtonProps) => {
  const {
    state: { isChecked },
    getInputProps,
    getCheckboxProps,
    getLabelProps,
  } = useRadio(radioProps)

  return (
    <chakra.label cursor="pointer">
      <input {...getInputProps({})} hidden />

      {/* 選択肢の見た目はここで変更できる */}

      <Box
        {...getCheckboxProps()}
        _hover={{ bg: 'orange.300' }}
        bg="orange.400"
        border={isChecked ? '2px solid blue' : ''}
        borderRadius={['10', '20']}
        h={['40px', '80px']}
        p="2"
        rounded="20"
        verticalAlign="middle"
        w="200px"
      >
        {/* 選択肢の文章 */}

        <Text {...getLabelProps()}>{text}</Text>
      </Box>
    </chakra.label>
  )
}
