import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Input,
  Select,
  Text,
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { DefaultLayout } from '../components/DefaultLayout'
import type { StudyLogGraphProps } from '../modules/studyLog/components/StudyLogGraph'

const StudyLogGraph = dynamic<StudyLogGraphProps>(
  () =>
    import('../modules/studyLog/components/StudyLogGraph').then(
      (mod) => mod.StudyLogGraph,
    ),
  { loading: () => <div>loading...</div>, ssr: false },
)

const Page = () => {
  return (
    <DefaultLayout>
      <Grid
        gap={6}
        templateColumns="repeat(2, 1fr)"
        templateRows="repeat(5, 1fr)"
      >
        <GridItem colSpan={1} rowSpan={5} w="100%">
          <Box
            bg="white"
            borderRadius="20px"
            borderWidth="2px"
            m="12px"
            overflow="hidden"
            p="12px"
          >
            <Text fontSize={32}>学習時間の記録</Text>

            <Box
              borderRadius="20px"
              borderWidth="2px"
              mt="12px"
              overflow="hidden"
              p="12px"
            >
              <Text>期間</Text>

              <Select id="start" placeholder="開始日時を選択">
                <option>データピッカー用のライブラリを導入したい</option>

                <option>データピッカー用のライブラリを導入したい</option>
              </Select>

              <Text>から</Text>

              <Select id="end" placeholder="終了日時を選択">
                <option>データピッカー用のライブラリを導入したい</option>

                <option>データピッカー用のライブラリを導入したい</option>
              </Select>

              <Text>まで</Text>
            </Box>

            <Box
              borderRadius="20px"
              borderWidth="2px"
              mt="12px"
              overflow="hidden"
              p="12px"
            >
              <StudyLogGraph
                data={[
                  {
                    amount: 20,
                    contents: ['Pythonの勉強'],
                    week: new Date('2022-04-26'),
                  },
                  {
                    amount: 18,
                    contents: ['Reactの勉強', 'Next.js'],
                    week: new Date('2022-05-03'),
                  },
                  { amount: 60, contents: [], week: new Date('2022-05-10') },
                  { amount: 65, contents: [], week: new Date('2022-05-17') },
                  { amount: 15, contents: [], week: new Date('2022-05-24') },
                  {
                    amount: 20,
                    contents: ['Pythonの勉強'],
                    week: new Date('2022-04-26'),
                  },
                  {
                    amount: 18,
                    contents: ['Reactの勉強', 'Next.js'],
                    week: new Date('2022-05-03'),
                  },
                  { amount: 60, contents: [], week: new Date('2022-05-10') },
                  { amount: 65, contents: [], week: new Date('2022-05-17') },
                  { amount: 15, contents: [], week: new Date('2022-05-24') },
                ]}
              />
            </Box>
          </Box>
        </GridItem>

        <GridItem colSpan={1} rowSpan={2} w="100%">
          <Box
            bg="white"
            borderRadius="20px"
            borderWidth="2px"
            m="12px"
            overflow="hidden"
            p="12px"
          >
            <Text fontSize={24}>名前：浦 優太</Text>

            <Text fontSize={24}>会員：一般会員</Text>
          </Box>
        </GridItem>

        <GridItem colSpan={1} rowSpan={3} w="100%">
          <Box
            bg="white"
            borderRadius="20px"
            borderWidth="2px"
            m="12px"
            overflow="hidden"
            p="12px"
          >
            <Text mt="12px">勉強内容</Text>

            <Input mt="12px" placeholder="勉強内容" rounded="full" />

            <Text mt="12px">勉強時間</Text>

            <Input mt="12px" placeholder="勉強時間" rounded="full" />

            <Text mt="12px">記入日</Text>

            <Input mt="12px" placeholder="記入日" rounded="full" />

            <Center h="100%">
              <Button mt="12px">追加</Button>
            </Center>
          </Box>
        </GridItem>
      </Grid>
    </DefaultLayout>
  )
}

export default Page
