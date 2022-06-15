import { Flex, Text, Button, Heading, Checkbox } from '@chakra-ui/react'

import React from 'react'
import { DefaultTestLayout } from '../components/DefaultTestLayout'
const Page = () => {
  const [time, setTime] = React.useState(5)
  React.useEffect(() => {
    const id = setInterval(() => {
      setTime((t) => {
        if (t <= 0) {
          clearInterval(id)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])
  React.useEffect(() => {
    if (time === 0) {
      console.debug('画面遷移する')
    }
  }, [time])

  return (
    <DefaultTestLayout>
      {time > 0 && (
        <Flex
          borderBottomColor="#0D0D0D"
          borderWidth="2px"
          justify="space-between"
          p="20"
        >
          <Flex
            alignItems="center"
            bg="#FFFFFE"
            borderColor="#0D0D0D"
            borderRadius="30px"
            borderWidth="2px"
          >
            <Button
              bg="#FFFFFE"
              borderRadius="30px"
              fontSize="4xl"
              h="100%"
              w="100%"
            >
              前の問題へ
            </Button>
          </Flex>

          <Flex
            alignItems="center"
            bg="#FFFFFE"
            borderColor="#0D0D0D"
            borderRadius="30px"
            borderWidth="2px"
            p="5"
          >
            <Text fontSize="4xl">
              {`残り時間:${Math.floor(time / 3600)}時間 ${Math.floor(
                (time % 3600) / 60,
              )}分${time % 60}秒`}
            </Text>
          </Flex>

          <Flex
            alignItems="center"
            bg="#FFFFFE"
            borderColor="#0D0D0D"
            borderRadius="30px"
            borderWidth="2px"
          >
            <Button
              bg="#FFFFFE"
              borderRadius="30px"
              fontSize="4xl"
              h="100%"
              w="100%"
            >
              次の問題へ
            </Button>
          </Flex>
        </Flex>
      )}

      {time > 0 && (
        <Flex justify="center" p="20">
          <Flex bg="#0D0D0D" borderRadius="30px" flexDir="column" w="75%">
            <Flex p="20">
              <Heading color="#FFFFFE" size="4xl">
                第三問
              </Heading>
            </Flex>

            <Flex p="20">
              <Text color="#FFFFFE" fontSize="4xl">
                &emsp;教師なし学習の分析手法であるものを次の四つの選択肢から一つ選べ。
              </Text>
            </Flex>
          </Flex>
        </Flex>
      )}

      {time > 0 && (
        <Flex justify="center" p="10">
          <Flex bg="#FF8E3C" borderRadius="30px" h="12vh" m="10" p="5" w="30%">
            <Checkbox colorScheme="orange" size="lg">
              R2D2(Recurrent Replay Distributed DQN)
            </Checkbox>
          </Flex>

          <Flex bg="#FF8E3C" borderRadius="30px" m="10" p="5" w="30%">
            <Checkbox colorScheme="orange" size="lg">
              PCA(Principal Component Analysis)
            </Checkbox>
          </Flex>
        </Flex>
      )}

      {time > 0 && (
        <Flex justify="center" p="10">
          <Flex bg="#FF8E3C" borderRadius="30px" h="12vh" m="10" p="5" w="30%">
            <Checkbox colorScheme="orange" size="lg">
              Q-Learning
            </Checkbox>
          </Flex>

          <Flex bg="#FF8E3C" borderRadius="30px" m="10" p="5" w="30%">
            <Checkbox colorScheme="orange" size="lg">
              線形回帰
            </Checkbox>
          </Flex>
        </Flex>
      )}

      {time == 0 && (
        <Flex justify="center" mt="200">
          <Flex
            alignItems="center"
            bg="#FFFFFE"
            borderColor="#0D0D0D"
            borderRadius="30px"
            borderWidth="2px"
            flexDir="column"
            h="50vh"
            justify="center"
            p="200"
            w="80%"
          >
            <Heading color="#0D0D0D" size="lg">
              試験時間が終了しました。下のボタンから回答を送信してください。
            </Heading>

            <Button bg="#FF8E3C" mt="5" size="lg">
              回答を送信する
            </Button>
          </Flex>
        </Flex>
      )}
    </DefaultTestLayout>
  )
}

export default Page
