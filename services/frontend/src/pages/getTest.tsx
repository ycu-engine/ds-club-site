import { DefaultLayout } from '../components/DefaultLayout'
import {
  Box,
  Heading,
  Select,
  UnorderedList,
  ListItem,
  Flex,
  Button,
  Checkbox,
} from '@chakra-ui/react'

import { useCallback, useState } from 'react'

const Page = () => {
  const [isActive, setIsActive] = useState(false)
  const handleOnChange = useCallback(() => {
    setIsActive((prev) => !prev)
  }, [])

  return (
    <DefaultLayout>
      <Flex
        alignItems="center"
        flexDir="column"
        gap="3"
        justify-content="center"
        minWidth="max-content"
        w="100vh"
      >
        <Box>
          <Heading color="0D0D0D" size="4xl">
            テスト受験確認ページ
          </Heading>
        </Box>

        <Box>
          <Heading color="0D0D0D" size="2xl">
            受験科目
          </Heading>

          <Select
            borderColor="#0D0D0D"
            placeholder="受験科目を選択してください"
          >
            <option value="Datascience">データサイエンス</option>

            <option value="Statistics">統計</option>
          </Select>
        </Box>

        <Box alignItems="center" bg="#FFFFFE" borderRadius="lg">
          <Heading color="0D0D0D" size="2xl">
            注意事項
          </Heading>

          <UnorderedList>
            <ListItem>試験時間は70分です</ListItem>

            <ListItem>80%の正答率で合格です</ListItem>

            <ListItem>
              試験時間中のWebを用いた検索は可能とします。ただし、第三者とともに解くことは禁止です。
            </ListItem>

            <ListItem>
              不正が発覚した場合には当該昇格試験の結果は無効とします。また、複数回の不正が発覚した場合は重い処分を下すことがあります。
            </ListItem>

            <ListItem>疑問点があれば開始前に運営にお聞きください。</ListItem>
          </UnorderedList>
        </Box>

        <Box>
          {/* <input type="checkbox" checked={true} name="controlled" color='#0D0D0D'>注意事項を確認しました</input> */}

          <Checkbox
            borderColor="#0D0D0D"
            color="#0D0D0D"
            isChecked={isActive}
            onChange={handleOnChange}
          >
            注意事項を確認しました
          </Checkbox>
        </Box>

        <Box>
          <Button
            bg="#FF8E3C"
            color="#0D0D0D"
            isDisabled={!isActive}
            size="lg"
          >
            テストを開始する
          </Button>
        </Box>
      </Flex>
    </DefaultLayout>
  )
}

export default Page
