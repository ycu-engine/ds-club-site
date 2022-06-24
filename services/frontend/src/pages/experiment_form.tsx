import { Box, Container, Heading, Input, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { DefaultLayout } from '../components/DefaultLayout'

const Page = () => {
  const InputForm = (props) => {
    const name = props.name
    return (
      <Box px="20" py="2" w="100%">
        {name}
        <Input borderColor="black" onChange={handleChange}></Input>
      </Box>
    )
  }

  const [text, setText] = useState('')
  const handleChange = (e) => {
    setText(e.target.value)
    console.log(text)
  }

  const FormName = [
    '名前',
    'メールアドレス',
    '学校・学部・学科名・学年',
    'パスワード',
    'パスワード確認用',
  ]

  return (
    <DefaultLayout>
      <Heading p="10">体験入会申請フォーム</Heading>
      <Container>
        <Box py="5" bg="white" borderRadius="24">
          <VStack spacing="1px">
            {FormName.map((value) => {
              return <InputForm name={value} />
            })}
            {/* これはれんしゅうよう */}
            <Box px="20" py="2" w="100%">
              練習用
              <Input borderColor="black" onChange={handleChange}></Input>
            </Box>
            {/* ここまで */}
          </VStack>
        </Box>
      </Container>
    </DefaultLayout>
  )
}

export default Page
