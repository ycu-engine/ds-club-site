import React from 'react'
import {
  Box,
  Heading,
  VStack,
  Text,
  Wrap,
  Container,
  Input,
  Flex,
  Button,
  useRadio,
  useRadioGroup,
  Textarea,
  chakra,
  Tooltip,
} from '@chakra-ui/react'

import { DefaultLayout } from '../components/DefaultLayout'
import { useState } from 'react'

type RadioChoicesProps = {
  correctIndex: string // 問題に対する正解の番号です。number型ではなくstring型であることに注意してください。
  radioTexts: string[] // 選択肢の文章です。stringを要素に持つラベルです。
}
// 選択肢部分のコンポーネント
const RadioChoices = (props: RadioChoicesProps) => {
  //　ラジオボタンのコンポーネント
  function CustomRadio(props) {
    const { text, ...radioProps } = props
    const { state, getInputProps, getCheckboxProps, getLabelProps } =
      useRadio(radioProps)

    return (
      <chakra.label cursor="pointer">
        <input {...getInputProps({})} hidden />
        {/* 選択肢の見た目はここで変更できる */}
        <Box
          {...getCheckboxProps()}
          border={state.isChecked ? '4px solid blue' : ''}
          w={200}
          p={2}
          verticalAlign="middle"
          rounded={20}
          borderRadius={20}
          bg="orange.400"
          h={['40px', '80px']}
          _hover={{ transform: 'scale(1.1)', transitionDuration: '.5s' }}
        >
          {/* 選択肢の文章 */}
          <Text {...getLabelProps()}>{text}</Text>
        </Box>
      </chakra.label>
    )
  }
  //   ラジオボタンコンポーネントここまで

  //   RadioGroupのHook
  const { value, getRadioProps, getRootProps } = useRadioGroup({
    defaultValue: '1',
  })

  //   選択肢のindexと文章をオブジェクト形式でまとめておく
  const choices = [
    { index: '1', text: `1: ${props.radioTexts[0]}` },
    { index: '2', text: `2: ${props.radioTexts[1]}` },
    { index: '3', text: `3: ${props.radioTexts[2]}` },
    { index: '4', text: `4: ${props.radioTexts[3]}` },
  ]

  //   正解・不正解フラグ
  let isCorrect = false
  const checkIsCorrect = (value) => {
    if (props.correctIndex === value) {
      isCorrect = true
    } else {
      isCorrect = false
    }
    return isCorrect
  }

  // RadioChoicesのreturn
  return (
    <Container {...getRootProps()} textAlign="center">
      <Text as="i" bg="blackAlpha.100" p={2}>
        【確認用】正誤: {checkIsCorrect(value) ? '正解' : '不正解'}
      </Text>
      <Wrap justify={'center'} spacing={[0, 5]} p={5}>
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

type TestProps = {
  testIndex: string // 問題番号
  testSentence: string // 問題文
  radioText1: string // 選択肢の文章
  radioText2: string
  radioText3: string
  radioText4: string
  correctIndex: string //　正解の選択肢の番号
}
// テスト問題の全体のコンポーネント,  RadioChoicesを子コンポーネントとして使用
const Test = (props: TestProps) => {
  // radioTextはリスト形式にまとめておく
  const radioTexts: string[] = [
    props.radioText1,
    props.radioText2,
    props.radioText3,
    props.radioText4,
  ]
  return (
    <Container>
      <VStack>
        {/* 問題部分 */}
        <Box
          bg="gray.700"
          color="white"
          w="full"
          m="10"
          p="5"
          h="300"
          borderRadius="20"
          boxShadow={'lg'}
        >
          {/* 問題番号 */}
          <Heading fontWeight="bold" p="5">
            {`第${props.testIndex}問`}
          </Heading>
          {/* 問題文 */}
          <Text>{props.testSentence}</Text>
        </Box>
        {/* 解答部分 */}
        <RadioChoices
          correctIndex={props.correctIndex}
          radioTexts={radioTexts}
        />
      </VStack>
    </Container>
  )
}

function makeTestPage() {
  // テスト用のデータを作成
  const sampleData = {
    testIndex: '5',
    testSentence: '顔が濡れるとダメなやつは誰？',
    radioText1: 'アンパンマン',
    radioText2: 'バイキンマン',
    radioText3: '食パンマン',
    radioText4: 'メロンパンナちゃん',
    correctIndex: '1',
  }
  //   問題のデータを管理するHook
  const [testData, setTestData] = useState<TestProps[]>([sampleData])

  // 問題追加画面のコンポーネント
  const AddTestMenu = () => {
    // オブジェクトでまとめておく
    const inputAreaOptions = [
      {
        inputType: Input, //コンポーネントの指定, JSXElementを指定
        category: '問題番号', // 何を追加するか
        placeholder: '問題番号を入力', //　プレースホルダー
        name: 'testIndex', //　識別用
      },
      {
        inputType: Textarea,
        category: '問題文',
        placeholder: '問題文を入力',
        name: 'testSentence',
      },
      {
        inputType: Input,
        category: '選択肢1',
        placeholder: '選択肢1を入力',
        name: 'radioText1',
      },
      {
        inputType: Input,
        category: '選択肢2',
        placeholder: '選択肢2を入力',
        name: 'radioText2',
      },
      {
        inputType: Input,
        category: '選択肢3',
        placeholder: '選択肢3を入力',
        name: 'radioText3',
      },
      {
        inputType: Input,
        category: '選択肢4',
        placeholder: '選択肢4を入力',
        name: 'radioText4',
      },
      {
        inputType: Input,
        category: '回答',
        placeholder: '1~4の整数値を入力',
        name: 'correctIndex',
      },
    ]

    //   入力された値をstateで管理する
    const [inputs, setInputs] = useState({
      testIndex: '',
      testSentence: '',
      radioText1: '',
      radioText2: '',
      radioText3: '',
      radioText4: '',
      correctIndex: '',
    })

    //   Inputに変更があったときの処理
    const handleInputChange = (e) => {
      const target = e.target
      // 値の更新
      const value = target.value
      const name = target.name
      // Inputのnameに対応するstateも更新する
      setInputs({ ...inputs, [name]: value })
    }

    const handleChagneTestData = () => {
      // リストの後ろに追加する
      setTestData([...testData, inputs])
      console.log(testData)
    }
    // 全部終わったかどうか
    let isFilled: boolean = Object.values(inputs).every((value) => value)

    return (
      // 縦に積んでいく
      <VStack
        bg="gray.200"
        w="20%"
        p="3"
        spacing="3"
        h={'100vh'}
        overflowY="scroll"
      >
        {/* mapでinputAreaを作る */}
        {inputAreaOptions.map((inputAreaOption) => {
          return (
            <Box>
              <Text fontWeight="bold" py="2">
                {inputAreaOption.category}
              </Text>
              <inputAreaOption.inputType
                key={inputAreaOption.name}
                name={inputAreaOption.name}
                placeholder={inputAreaOption.placeholder}
                outlineColor="black"
                size="sm"
                onChange={handleInputChange}
              ></inputAreaOption.inputType>
            </Box>
          )
        })}
        {/* 写真を追加するボタン */}
        <Button colorScheme="blue" variant="ghost">
          写真を追加
        </Button>
        {/* 問題を追加するボタン */}
        <Tooltip
          label={
            isFilled ? 'クリックして問題を追加' : '項目を全て埋めてください'
          }
          shouldWrapChildren
        >
          <Button
            isDisabled={!isFilled}
            colorScheme="pink"
            onClick={handleChagneTestData}
          >
            追加する
          </Button>
        </Tooltip>
      </VStack>
    )
  }

  // makeTestPageのreturn
  return (
    <DefaultLayout>
      <Flex>
        {/* testDataはオブジェクトを要素にもつリストなのでテスト的に追加されたものを表示する */}
        <Test {...testData.slice(-1)[0]} />
        <AddTestMenu />
      </Flex>
    </DefaultLayout>
  )
}

export default makeTestPage
