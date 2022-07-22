import React, { useState } from 'react'
import type { ReactNode } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm, Controller } from 'react-hook-form'
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
  useRadioGroup,
  FormControl,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
  Radio,
  RadioGroup,
  Textarea,
} from '@chakra-ui/react'

import { DefaultLayout } from '../components/DefaultLayout'
import { RadioButton } from '../components/RadioButton/RadioButton'
import { LegendInput } from '../components/InputForm/LegendInput'

type RadioChoicesProps = {
  correctIndex: string // 問題に対する正解の番号です。number型ではなくstring型であることに注意してください。
  radioText: string[] // 選択肢の文章です。stringを要素に持つラベルです。
}
// 選択肢部分のコンポーネント
const RadioChoices = ({ correctIndex, radioText }: RadioChoicesProps) => {
  //   RadioGroupのHook
  const { value, getRadioProps, getRootProps } = useRadioGroup({
    defaultValue: '1',
  })

  //   選択肢のindexと文章をオブジェクト形式でまとめておく
  const choices = [
    { index: '1', text: `1: ${radioText[0]}` },
    { index: '2', text: `2: ${radioText[1]}` },
    { index: '3', text: `3: ${radioText[2]}` },
    { index: '4', text: `4: ${radioText[3]}` },
  ]

  //   正解・不正解フラグ
  const isCorrect = correctIndex === value

  // RadioChoicesのreturn
  return (
    <Container {...getRootProps()} textAlign="center">
      <Text as="i" bg="blackAlpha.100" p={2}>
        【確認用】正誤: {isCorrect ? '正解' : '不正解'}
      </Text>

      <Wrap justify="center" p={5} spacing={[0, 5]}>
        {choices.map((choice) => {
          return (
            <RadioButton
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
  radioText: string[] // 回答テキスト
  correctIndex: string // 正解の選択肢の番号
  image?: string // 画像ファイル
}
// テスト問題の全体のコンポーネント,  RadioChoicesを子コンポーネントとして使用
const Test = ({
  testIndex,
  testSentence,
  radioText,
  image,
  correctIndex,
}: TestProps) => {
  return (
    <Container>
      <VStack>
        {/* 問題部分 */}

        <Box
          bg="gray.700"
          borderRadius="20"
          boxShadow="lg"
          color="white"
          m="10"
          minH="300"
          p="5"
          w="full"
        >
          {/* 問題番号 */}

          <Heading fontWeight="bold" p="5">
            {`第${testIndex}問`}
          </Heading>

          {/* 問題文 */}

          <Text>{testSentence}</Text>

          <Image h="200" objectFit="scale-down" src={image} />
        </Box>

        {/* 解答部分 */}

        <RadioChoices correctIndex={correctIndex} radioText={radioText} />
      </VStack>
    </Container>
  )
}

type AddTestMenuProps = {
  AddTestFunc: (inputs: TestProps) => void
  containerProps?: object
}
// 問題追加画面のコンポーネント
const AddTestMenu = ({ AddTestFunc, containerProps }: AddTestMenuProps) => {
  const { register, handleSubmit, control } = useForm<TestProps>()
  const onSubmit: SubmitHandler<TestProps> = (data) => {
    console.info(data)
    AddTestFunc(data)
  }

  return (
    <VStack
      bg="gray.100"
      h="100vh"
      overflowY="scroll"
      p="3"
      spacing="30px"
      {...containerProps}
    >
      <FormControl isRequired>
        <LegendInput
          legendValue="問題番号"
          placeholder="問題番号を入力"
          register={register('testIndex', { min: 1, required: true })}
          type="number"
        />

        <LegendInput
          as={Textarea}
          legendValue="問題文"
          placeholder="問題文を入力"
          register={register('testSentence', { required: true })}
        />

        <LegendInput
          legendValue="回答1"
          placeholder="1つ目の回答を入力"
          register={register('radioText.0', { required: true })}
        />

        <LegendInput
          legendValue="回答2"
          placeholder="2つ目の回答を入力"
          register={register('radioText.1', { required: true })}
        />

        <LegendInput
          legendValue="回答3"
          placeholder="3つ目の回答を入力"
          register={register('radioText.2', { required: true })}
        />

        <LegendInput
          legendValue="回答4"
          placeholder="4つ目の回答を入力"
          register={register('radioText.3', { required: true })}
        />

        <Controller
          control={control}
          name="correctIndex"
          render={({ field: { onChange, value } }) => (
            <RadioGroup onChange={onChange} value={value}>
              <Text>正解の番号を入力</Text>

              <HStack>
                <Radio value="1">1</Radio>

                <Radio value="2">2</Radio>

                <Radio value="3">3</Radio>

                <Radio value="4">4</Radio>
              </HStack>
            </RadioGroup>
          )}
        />

        {/* 写真を追加 */}

        <Input
          accept="image/*"
          placeholder="写真を追加"
          type="file"
          {...register('image')}
        />

        {/* 問題を追加するボタン */}

        <Button
          colorScheme="pink"
          display="block"
          mx="auto"
          onClick={handleSubmit(onSubmit)}
          type="submit"
        >
          追加する
        </Button>
      </FormControl>
    </VStack>
  )
}

type AddTestMenuModalProps = {
  children: ReactNode
}
// テスト追加画面のモーダル
const AddTestMenuModal = ({ children }: AddTestMenuModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button
        colorScheme="teal"
        display={{ base: 'block', md: 'None' }}
        mx="auto"
        onClick={onOpen}
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

type TestNumberSliderProps = {
  testLen: number
  setTestNo: React.Dispatch<React.SetStateAction<number>>
}
const TestNumberSlider = ({ testLen, setTestNo }: TestNumberSliderProps) => {
  return (
    <Box bg="green.100" borderRadius="20" mx="auto" p="5" w="20%">
      <Text>問題を選択</Text>

      <NumberInput
        defaultValue={0}
        max={testLen - 1}
        min={0}
        onChange={(event) => {
          setTestNo(Number(event))
        }}
      >
        <NumberInputField />

        <NumberInputStepper>
          <NumberIncrementStepper />

          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Box>
  )
}

const MakeTestPage = () => {
  // テスト用のデータを作成
  const sampleData: TestProps = {
    correctIndex: '1',
    image:
      'data:image/jpeg;base64,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',
    radioText: [
      'アンパンマン',
      'バイキンマン',
      '食パンマン',
      'メロンパンナちゃん',
    ],
    testIndex: '5',
    testSentence: '顔が濡れるとダメなやつは誰？',
  }
  //   問題のデータを管理するHook
  const [testData, setTestData] = useState<TestProps[]>([sampleData])
  // データを追加するコールバック関数
  const AddTestData: (inputs: TestProps) => void = (inputs: TestProps) => {
    setTestData([...testData, inputs])
  }

  // テストの番号を変更
  const [testNumber, setTestNumber] = useState<number>(0)

  // makeTestPageのreturn
  return (
    <DefaultLayout>
      <Flex>
        {/* testDataはオブジェクトを要素にもつリストなのでテスト的に追加されたものを表示する */}

        <Test {...testData[testNumber]} />

        <AddTestMenu
          AddTestFunc={AddTestData}
          containerProps={{ display: { base: 'None', md: 'initial' } }}
        />
      </Flex>

      <TestNumberSlider setTestNo={setTestNumber} testLen={testData.length} />

      <AddTestMenuModal>
        <AddTestMenu
          AddTestFunc={AddTestData}
          containerProps={{
            alignItems: 'center',
            bg: 'transparent',
          }}
        />
      </AddTestMenuModal>
    </DefaultLayout>
  )
}

export default MakeTestPage
