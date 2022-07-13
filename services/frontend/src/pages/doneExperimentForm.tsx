import { Box, Text } from '@chakra-ui/react'
import { DefaultLayout } from '../components/DefaultLayout'
import React from 'react'

const Page = () => {
  return (
    <DefaultLayout>
      <Box p={10} pl={35} pr={35}>
        <Box bg="#FFFFFE" p={8}>
          <Text fontSize="5xl">
            体験入会へのお申し込みありがとうございます。
          </Text>

          <Text fontSize="4xl" mt={20}>
            ご記入いただいたメールアドレス宛にDiscordへの招待リンクを送らせて頂いておりますのでDiscordへの加入をお願いします。
          </Text>
        </Box>
      </Box>
    </DefaultLayout>
  )
}

export default Page
