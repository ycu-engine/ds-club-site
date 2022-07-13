import { DefaultLayout } from '../components/DefaultLayout'
import {
  Heading,
  Select,
  OrderedList,
  ListItem,
  Flex,
  Button,
  Checkbox,
  VStack,
} from '@chakra-ui/react'

import { useCallback, useState } from 'react'

const Page = () => {
  const [isActive, setIsActive] = useState(false)
  const handleOnChange = useCallback(() => {
    setIsActive((prev) => !prev)
  }, [])

  return (
    <DefaultLayout>
      <Flex flexDir="column" h="100vh" w="100vw">
        <VStack spacing={6}>
          <Flex
            flexDir="column"
            h="20vh"
            justify="center"
            textAlign="center"
            w="70vw"
          >
            <Flex justify="left" textAlign="left">
              <Heading size="3xl">テスト受験確認ページ</Heading>
            </Flex>
          </Flex>

          <Flex
            flexDir="column"
            h="30vh"
            justify="center"
            textAlign="center"
            w="50vw"
          >
            <Flex justify="left" textAlign="left">
              <VStack>
                <Heading size="2xl">受験科目を選択してください</Heading>
                <Select placeholder="Select option" borderColor={'0D0D0D'}>
                  <option value="datascience">データサイエンス</option>
                  <option value="statistic">統計</option>
                  <option value="enginner">エンジニア</option>
                </Select>
              </VStack>
            </Flex>
          </Flex>

          <Flex
            flexDir="column"
            h="60%"
            justify="center"
            textAlign="left"
            w="50vw"
          >
            <Flex justify="left" textAlign="left">
              <VStack spacing={50}>
                <Flex bgColor={'#FFFFFE'}>
                  <VStack>
                    <Heading size="2xl" p="5%">
                      注意事項です。よく読んだ上でテストに臨んでください。
                    </Heading>
                    <OrderedList p="10%">
                      <ListItem pb="3%">試験時間は60分です。</ListItem>
                      <ListItem pb="3%">80%以上が合格です。</ListItem>
                      <ListItem pb="3%">
                        試験時間中の検索は可とします。ただし、第三者と解くことは禁じます。
                      </ListItem>
                      <ListItem>
                        不正発覚時には当該試験は0点。運営側で協議の上厳しい処分を下します。
                      </ListItem>
                    </OrderedList>
                  </VStack>
                </Flex>
                <Flex>
                  <Checkbox
                    isChecked={isActive}
                    onChange={handleOnChange}
                    borderColor={'#0D0D0D'}
                  >
                    上記注意事項を確認しました。
                  </Checkbox>
                </Flex>
              </VStack>
            </Flex>
          </Flex>
          <Flex w="80%" justify="center" h="10vh">
            <Button
              pl="20%"
              pr="20%"
              pt="2%"
              pb="2%"
              bgColor={'#FF8E3C'}
              isDisabled={!isActive}
            >
              テストを開始します
            </Button>
          </Flex>
        </VStack>
      </Flex>
    </DefaultLayout>
  )
}

export default Page
