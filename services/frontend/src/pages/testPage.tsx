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
      console.log('画面遷移する')
    }
  }, [time])

  return (
    <DefaultTestLayout>
      {time > 0 && (
        <Flex
          justify="space-between"
          p="20"
          borderBottomColor={'#0D0D0D'}
          borderWidth="2px"
        >
          <Flex
            bg={'#FFFFFE'}
            alignItems="center"
            borderColor={'#0D0D0D'}
            borderWidth="2px"
            borderRadius="30px"
          >
            <Button
              fontSize="4xl"
              w="100%"
              h="100%"
              bg={'#FFFFFE'}
              borderRadius="30px"
            >
              前の問題へ
            </Button>
          </Flex>
          <Flex
            bg={'#FFFFFE'}
            alignItems="center"
            borderColor={'#0D0D0D'}
            borderWidth="2px"
            p="5"
            borderRadius="30px"
          >
            <Text fontSize="4xl">
              残り時間:{Math.floor(time / 3600)}時間
              {Math.floor((time % 3600) / 60)}分{time % 60}秒
            </Text>
          </Flex>
          <Flex
            bg={'#FFFFFE'}
            alignItems="center"
            borderColor={'#0D0D0D'}
            borderWidth="2px"
            borderRadius="30px"
          >
            <Button
              fontSize="4xl"
              w="100%"
              h="100%"
              bg={'#FFFFFE'}
              borderRadius="30px"
            >
              次の問題へ
            </Button>
          </Flex>
        </Flex>
      )}
      {time > 0 && (
        <Flex p="20" justify="center">
          <Flex bg={'#0D0D0D'} flexDir="column" w="75%" borderRadius="30px">
            <Flex p="20">
              <Heading size="4xl" color={'#FFFFFE'}>
                第三問
              </Heading>
            </Flex>
            <Flex p="20">
              <Text fontSize="4xl" color={'#FFFFFE'}>
                &emsp;教師なし学習の分析手法であるものを次の四つの選択肢から一つ選べ。
              </Text>
            </Flex>
          </Flex>
        </Flex>
      )}
      {time > 0 && (
        <Flex justify="center" p="10">
          <Flex
            bg={'#FF8E3C'}
            borderRadius="30px"
            w="30%"
            h="12vh"
            p="5"
            m="10"
          >
            <Checkbox size="lg" colorScheme="orange">
              R2D2(Recurrent Replay Distributed DQN)
            </Checkbox>
          </Flex>
          <Flex bg={'#FF8E3C'} borderRadius="30px" w="30%" p="5" m="10">
            <Checkbox size="lg" colorScheme="orange">
              PCA(Principal Component Analysis)
            </Checkbox>
          </Flex>
        </Flex>
      )}
      {time > 0 && (
        <Flex justify="center" p="10">
          <Flex
            bg={'#FF8E3C'}
            borderRadius="30px"
            w="30%"
            h="12vh"
            p="5"
            m="10"
          >
            <Checkbox size="lg" colorScheme="orange">
              Q-Learning
            </Checkbox>
          </Flex>
          <Flex bg={'#FF8E3C'} borderRadius="30px" w="30%" p="5" m="10">
            <Checkbox size="lg" colorScheme="orange">
              線形回帰
            </Checkbox>
          </Flex>
        </Flex>
      )}
      {time == 0 && (
        <Flex justify="center" mt="200">
          <Flex
            alignItems="center"
            justify="center"
            borderColor={'#0D0D0D'}
            borderWidth="2px"
            borderRadius="30px"
            bg={'#FFFFFE'}
            w="80%"
            h="50vh"
            p="200"
            flexDir="column"
          >
            <Heading size="lg" color={'#0D0D0D'}>
              試験時間が終了しました。下のボタンから回答を送信してください。
            </Heading>
            <Button size="lg" bg={'#FF8E3C'} mt="5">
              回答を送信する
            </Button>
          </Flex>
        </Flex>
      )}
    </DefaultTestLayout>
  )
}

export default Page
