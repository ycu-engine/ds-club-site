import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  VStack,
} from '@chakra-ui/react'
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

  // passwordの表示状態
  const [show, setShow] = useState(false)
  // buttonが押された時にstateを逆の値にする。
  const handleClickShow = () => {
    setShow(!show)
  }
  // Password用のコンポーネント定義
  const inputPassword = (FormName) => {
    return (
      <Box px="20" py="2" w="100%">
        {FormName}
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            borderColor="black"
            name={FormName}
            value={formValue[FormName]}
            type={show ? 'text' : 'password'}
            onChange={handleChangeInput}
          />
          <InputRightElement width="4.5rem">
            <Button p="1" h="1.75rem" size="sm" onClick={handleClickShow}>
              {show ? '表示する' : '非表示'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
    )
  }

  // 確認ページの表示状態 trueならspinnerを表示
  const [isLoading, setLoading] = useState(false)
  const handleClickConform = () => {
    setLoading(!isLoading)
  }

  // ここからページ
  return (
    <DefaultLayout>
      {/* 見出し */}
      <Heading p="10">体験入会申請フォーム</Heading>
      {/* メインの部分, フォームはここにする */}
      <Container>
        <Center>
          <Box py="5" bg="white" borderRadius="24">
            <VStack spacing="1px">
              {/* パスワード以外のinput要素 */}
              {FormNames.slice(0, 3).map((FormName) => {
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
              {/* パスワードのinput要素 */}
              {FormNames.slice(3, 5).map((FormName) => {
                return inputPassword(FormName)
              })}
            </VStack>
          </Box>
        </Center>
      </Container>
      {/* 確認ページへボタン */}
      <Container>
        <Box w="100%" py="10">
          <Center>
            {/* あとで遷移先のpathを入力します。初期ページに遷移させてます */}
            <Link w="80%" href="./">
              <Button
                w="100%"
                colorScheme="orange"
                _hover={{ bg: '#ffa77a' }}
                isLoading={isLoading}
                onClick={handleClickConform}
              >
                確認ページへ
              </Button>
            </Link>
          </Center>
        </Box>
      </Container>
    </DefaultLayout>
  )
}

export default Page
