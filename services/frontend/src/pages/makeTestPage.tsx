import React, { ReactNode } from 'react'
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
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  HStack,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

import { DefaultLayout } from '../components/DefaultLayout'
import { useState } from 'react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

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
          border={state.isChecked ? '2px solid blue' : ''}
          w="200px"
          p="2"
          verticalAlign="middle"
          rounded="20"
          borderRadius={['10', '20']}
          bg="orange.400"
          h={['40px', '80px']}
          _hover={{ bg: 'orange.300' }}
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
  image?: string //　画像ファイル
}
// テスト問題の全体のコンポーネント,  RadioChoicesを子コンポーネントとして使用
const Test = (props: TestProps) => {
  const {
    testIndex,
    testSentence,
    radioText1,
    radioText2,
    radioText3,
    radioText4,
    image,
    correctIndex,
  } = props
  // radioTextはリスト形式にまとめておく
  const radioTexts: string[] = [radioText1, radioText2, radioText3, radioText4]
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
            {`第${testIndex}問`}
          </Heading>
          {/* 問題文 */}
          <Text>{testSentence}</Text>
          <Image src={image} />
        </Box>
        {/* 解答部分 */}
        <RadioChoices correctIndex={correctIndex} radioTexts={radioTexts} />
      </VStack>
    </Container>
  )
}

type AddTestMenuProps = {
  AddTestFunc: React.Dispatch<React.SetStateAction<unknown>>
  containerProps?: object
}
// 問題追加画面のコンポーネント
const AddTestMenu = (props: AddTestMenuProps) => {
  // 親からテスト追加用のコールバック関数を受け取る
  const { AddTestFunc, containerProps } = props
  //   入力された値を管理するHook
  const [inputs, setInputs] = useState({
    testIndex: '',
    testSentence: '',
    radioText1: '',
    radioText2: '',
    radioText3: '',
    radioText4: '',
    image: '',
    correctIndex: '',
  })
  // 入力の状態を管理するHook
  const [isFilled, setIsFilled] = useState<boolean>(false)

  //   Inputに変更があったときの処理
  const handleInputChange = (e) => {
    // イベントを受け取る
    const { value, name } = e.target
    // Inputのnameに対応するstateを更新する
    setInputs({ ...inputs, [name]: value })
  }

  // inputsの値が更新されるのを感知して実行する副作用フック
  React.useEffect(() => {
    console.log(inputs)
    // 全て埋まっていたらtrueにする
    setIsFilled(
      Object.values({ ...inputs, image: '>_<' }).every((value) => value),
    )
  }, [inputs])

  // 問題を追加する
  const handleClickAddTestBtn = () => {
    // 受け取ったコールバック関数を実行
    AddTestFunc(inputs)
  }

  // inputに使用するPropsをまとめておく
  const inputProps = {
    outlineColor: 'black',
    size: 'sm',
    onChange: handleInputChange,
  }
  return (
    // 縦に積んでいく
    <VStack
      bg="gray.100"
      p="3"
      spacing="3"
      h={'100vh'}
      overflowY="scroll"
      {...containerProps}
    >
      <FormControl isRequired>
        <FormLabel as="legend">問題番号</FormLabel>
        <Input
          {...inputProps}
          type="number"
          name="testIndex"
          placeholder="問題番号を入力"
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel as="legend">問題文</FormLabel>
        <Textarea
          {...inputProps}
          name="testSentence"
          placeholder="問題文を入力"
        />
      </FormControl>
      {/* 回答1 */}
      {[1, 2, 3, 4].map((index) => {
        return (
          <FormControl isRequired key={`回答${index}`}>
            <FormLabel as="legend">{`回答${index}`}</FormLabel>
            <Input
              {...inputProps}
              name={`radioText${index}`}
              placeholder={`回答${index}`}
            />
          </FormControl>
        )
      })}
      {/* 正解の番号 */}
      <FormControl as="fieldset">
        <FormLabel as="legend">解答の番号</FormLabel>
        <RadioGroup defaultValue="0">
          <HStack>
            <Radio value="1" name="correctIndex" onChange={handleInputChange}>
              1
            </Radio>
            <Radio value="2" name="correctIndex" onChange={handleInputChange}>
              2
            </Radio>
            <Radio value="3" name="correctIndex" onChange={handleInputChange}>
              3
            </Radio>
            <Radio value="4" name="correctIndex" onChange={handleInputChange}>
              4
            </Radio>
          </HStack>
        </RadioGroup>
      </FormControl>
      {/* 写真を追加するボタン */}
      <Input
        placeholder="写真を追加"
        type="file"
        accept="image/*"
        name="image"
        onChange={handleInputChange}
      />
      {/* 問題を追加するボタン */}
      <Tooltip
        label={isFilled ? 'クリックして問題を追加' : '項目を全て埋めてください'}
        shouldWrapChildren
      >
        <Button
          display="block"
          mx="auto"
          isDisabled={!isFilled}
          colorScheme="pink"
          onClick={handleClickAddTestBtn}
        >
          追加する
        </Button>
      </Tooltip>
    </VStack>
  )
}

type AddTestMenuModalProps = {
  children: ReactNode
}
const AddTestMenuModal = ({ children }: AddTestMenuModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button
        colorScheme="teal"
        mx="auto"
        onClick={onOpen}
        display={{ base: 'block', md: 'None' }}
      >
        問題を追加
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>問題追加画面</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              閉じる
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

function makeTestPage() {
  // テスト用のデータを作成
  const sampleData: TestProps = {
    testIndex: '5',
    testSentence: '顔が濡れるとダメなやつは誰？',
    radioText1: 'アンパンマン',
    radioText2: 'バイキンマン',
    radioText3: '食パンマン',
    radioText4: 'メロンパンナちゃん',
    image: '',
    correctIndex: '1',
  }
  //   問題のデータを管理するHook
  const [testData, setTestData] = useState<TestProps[]>([sampleData])
  // データを追加する関数
  const AddTestData = (inputs: TestProps): void => {
    setTestData([...testData, inputs])
  }
  // makeTestPageのreturn
  return (
    <DefaultLayout>
      <Flex>
        {/* testDataはオブジェクトを要素にもつリストなのでテスト的に追加されたものを表示する */}
        <Test {...testData.slice(-1)[0]} />
        <AddTestMenu
          AddTestFunc={AddTestData}
          containerProps={{ display: { base: 'None', md: 'initial' } }}
        />
      </Flex>
      <AddTestMenuModal>
        <AddTestMenu
          AddTestFunc={AddTestData}
          containerProps={{
            bg: 'transparent',
            alignItems: 'center',
          }}
        />
      </AddTestMenuModal>
    </DefaultLayout>
  )
}

export default makeTestPage
