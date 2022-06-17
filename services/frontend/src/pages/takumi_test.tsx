import {
  Box,
  Image,
  useRadio,
  Button,
  Text,
  useRadioGroup,
  Wrap,
  Container,
} from '@chakra-ui/react'
import { chakra } from '@chakra-ui/react'

function Example() {
  function CustomRadio(props) {
    const { text, ...radioProps } = props
    const { state, getInputProps, getCheckboxProps, getLabelProps } =
      useRadio(radioProps)

    return (
      <chakra.label cursor="pointer">
        <input {...getInputProps({})} hidden />
        <Box
          {...getCheckboxProps()}
          border={state.isChecked ? '2px solid green' : ''}
          w={200}
          p={2}
          rounded="20"
          borderRadius="20"
          bg="orange.400"
          h="80px"
        >
          <Text
            {...getLabelProps()}
          >{`${text},isChecked:${state.isChecked}`}</Text>
        </Box>
      </chakra.label>
    )
  }

  const choices = [
    { index: '1', text: '1:解答1' },
    { index: '2', text: '2:解答2' },
    { index: '3', text: '3:解答3' },
    { index: '4', text: '4:解答4' },
  ]

  const { value, getRadioProps, getRootProps } = useRadioGroup({
    defaultValue: 1,
  })

  let isCorrect = false
  const answer = '1'
  const handleCheckAnswer = (value) => {
    if (answer === value) {
      isCorrect = true
    } else {
      isCorrect = false
    }
    return isCorrect
  }

  return (
    <Container {...getRootProps()}>
      <Text>
        The selected radio is: {handleCheckAnswer(value) ? '正解' : '不正解'}
      </Text>
      <Wrap justify={'center'}>
        {choices.map((choice) => {
          return (
            <CustomRadio
              key={choice.index}
              text={choice.text}
              {...getRadioProps({ value: choice.index })}
            />
          )
        })}
      </Wrap>
      <Text>{isCorrect}</Text>
    </Container>
  )
}

export default Example
