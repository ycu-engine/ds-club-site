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
import type { ChangeEventHandler } from 'react'
import { useEffect, useState } from 'react'
import { DefaultLayout } from '../components/DefaultLayout'

type Form = {
  パスワード: string
  パスワード確認用: string
  メールアドレス: string
  名前: string
  '学校・学部・学科名・学年': string
}
type FormKey = keyof Form

// Password用のコンポーネント定義
const InputPassword = ({
  formName,
  handleChangeInput,
  value,
}: {
  formName: FormKey
  handleChangeInput: ChangeEventHandler<HTMLInputElement>
  value: string
}) => {
  // Hook定義
  const [showPass, setShowPass] = useState(false)
  return (
    <Box px="20" py="2" w="100%">
      {formName}

      <InputGroup size="md">
        <Input
          borderColor="black"
          name={formName}
          onChange={handleChangeInput}
          pr="4.5rem"
          type={showPass ? 'text' : 'password'}
          value={value}
        />

        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            onClick={() => {
              setShowPass((prev) => !prev)
            }}
            p="1"
            size="sm"
          >
            {showPass ? '非表示' : '表示'}
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  )
}

const Page = () => {
  // Hook定義, 入力された値を扱う
  const [formValue, setFormValue] = useState<Form>({
    パスワード: '',
    パスワード確認用: '',
    メールアドレス: '',
    名前: '',
    '学校・学部・学科名・学年': '',
  })

  // Inputのname属性のリスト, Hookと揃える
  const FormNames = [
    '名前',
    'メールアドレス',
    '学校・学部・学科名・学年',
    'パスワード',
    'パスワード確認用',
  ] as const

  // Inputが変更されたときの処理
  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    // イベントが発生した対象のname属性とvalue属性を取得
    const { name, value } = event.target
    setFormValue({ ...formValue, [name]: value })
  }

  // 確認ページへボタンの表示状態 trueならspinnerを表示
  const [isLoading, setIsLoading] = useState(false)
  const handleClickConform = () => {
    setIsLoading((prev) => !prev)
  }

  // すべて入力されているかのhook

  // 確認ページボタンのIsSamePassのstate
  const [isDisabled, setIsDisabled] = useState<boolean>(true)

  // パスワードが一致するかしないかによる条件分岐
  useEffect(() => {
    // IsSamePassのstate変更
    if (formValue.パスワード === formValue.パスワード確認用) {
      setIsDisabled(false) // 一致すればfalseにしボタンを押せるようにする
    } else {
      setIsDisabled(true) // 一致しなければtrueにしボタンを押せなくする
    }
    // 何も入力していな時の処理
    if (formValue.パスワード === '' || formValue.パスワード確認用 === '') {
      setIsDisabled(true)
    }
  }, [formValue.パスワード, formValue.パスワード確認用])

  // ここからページ
  return (
    <DefaultLayout hideHeader>
      {/* 見出し */}

      <Heading p="10">体験入会申請フォーム</Heading>

      {/* メインの部分, フォームはここにする */}

      <Container>
        <Center>
          <Box bg="white" borderRadius="24" py="5">
            <VStack spacing="1px">
              {/* パスワード以外のinput要素 */}

              {FormNames.slice(0, 3).map((FormName) => {
                return (
                  // コンポーネント化しておく
                  <Box key={FormName} px="20" py="2" w="100%">
                    {FormName}

                    {/* name属性を定義してイベントで扱えるようにする */}

                    <Input
                      borderColor="black" // map関数でまとめてコンポーネントを生成したら一意なkey属性を設定する必要がある
                      key={FormName}
                      name={FormName}
                      onChange={handleChangeInput}
                      value={formValue[FormName]}
                    />
                  </Box>
                )
              })}

              {/* パスワードのinput要素 */}

              <InputPassword
                formName={FormNames[3]}
                handleChangeInput={handleChangeInput}
                value={formValue['パスワード']}
              />

              {/* パスワード確認用のinput要素 */}

              <InputPassword
                formName={FormNames[4]}
                handleChangeInput={handleChangeInput}
                value={formValue['パスワード確認用']}
              />
            </VStack>
          </Box>
        </Center>
      </Container>

      {/* 確認ページへボタン */}

      <Container>
        <Box py="10" w="100%">
          <Center>
            {/* あとで遷移先のpathを入力します。とりあえず初期ページに遷移させてます */}

            <Link href="./" w="80%">
              <Button
                _hover={{ bg: '#ffa77a' }}
                colorScheme="orange"
                isDisabled={isDisabled}
                isLoading={isLoading}
                onClick={handleClickConform}
                w="100%"
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
