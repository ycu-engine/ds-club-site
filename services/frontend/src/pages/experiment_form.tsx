import { Box, Container, Heading, Input, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { DefaultLayout } from '../components/DefaultLayout'

const Page = () => {
  // Hook定義, 入力された値を扱う
  const [formValue, setFormValue] = useState({
    名前: '',
    メールアドレス: '',
    '学校・学部・学科名・学年': '',
    パスワード: '',
    パスワード確認用: '',
  })

  // Inputのname属性のリスト, Hookと揃える
  const FormNames = [
    '名前',
    'メールアドレス',
    '学校・学部・学科名・学年',
    'パスワード',
    'パスワード確認用',
  ]

  // Inputが変更されたときの処理
  const handleChangeInput = (event) => {
    // イベントが発生した対象のname属性とvalue属性を取得
    const { name, value } = event.target
    setFormValue({ ...formValue, [name]: value })
    console.log(formValue)
  }

  return (
    <DefaultLayout>
      {/* 見出し */}
      <Heading p="10">体験入会申請フォーム</Heading>
      {/* メインの部分, フォームはここにする */}
      <Container>
        <Box py="5" bg="white" borderRadius="24">
          <VStack spacing="1px">
            {FormNames.map((FormName) => {
              return (
                // コンポーネント化しておく
                <Box px="20" py="2" w="100%">
                  {FormName}
                  {/* name属性を定義してイベントで扱えるようにする */}
                  <Input
                    borderColor="black"
                    name={FormName}
                    value={formValue[FormName]}
                    onChange={handleChangeInput}
                  ></Input>
                </Box>
              )
            })}
          </VStack>
        </Box>
      </Container>
    </DefaultLayout>
  )
}

export default Page
