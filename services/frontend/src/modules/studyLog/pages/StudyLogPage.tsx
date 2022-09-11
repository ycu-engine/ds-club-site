import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Select,
  Text,
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { DefaultLayout } from '../../../components/DefaultLayout'
import {
  useStudyLogPageQuery,
  useStudyLogPage_CreateStudyLogMutation,
} from '../../../generates/graphql'

import { SubmitHandler, useForm } from 'react-hook-form'
import { InputBox } from '../../../components/InputForm/InputBox'
import type { StudyLogGraphProps } from '../components/StudyLogGraph'

const StudyLogGraph = dynamic<StudyLogGraphProps>(
  () => import('../components/StudyLogGraph').then((mod) => mod.StudyLogGraph),
  { loading: () => <div>loading...</div>, ssr: false },
)

type CreateStudyLogForm = {
  studiedAt: Date
  studyContent: string
  studyTime: number
}

export const StudyLogPage = () => {
  const { register, handleSubmit } = useForm<CreateStudyLogForm>()

  const [mutateCreateStudyLog] = useStudyLogPage_CreateStudyLogMutation()

  const { data, loading, error } = useStudyLogPageQuery({
    variables: { userId: '1' },
  })

  const onSubmit: SubmitHandler<CreateStudyLogForm> = async (forms) => {
    console.debug(forms)
    await mutateCreateStudyLog({
      variables: {
        input: {
          studiedAt: forms.studiedAt.toISOString().slice(0, 10),
          studyContent: forms.studyContent,
          studyTime: forms.studyTime,
        },
      },
    })
  }

  if (loading) {
    return <div>loading</div>
  }
  if (error) {
    console.error(error)
    return <div>エラーが発生しました</div>
  }
  if (!data) {
    return <div>データが見つかりませんでした</div>
  }

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
              as="form"
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
              <StudyLogGraph data={data.getStudyLog} />
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
            as="form"
            bg="white"
            borderRadius="20px"
            borderWidth="2px"
            m="12px"
            onSubmit={handleSubmit(onSubmit)}
            overflow="hidden"
            p="12px"
          >
            <InputBox title="勉強内容" {...register('studyContent')} />

            <InputBox
              title="勉強時間(分)"
              type="number"
              {...register('studyTime', {
                required: '必須項目です',
                valueAsNumber: true,
              })}
            />

            <InputBox
              title="学習日"
              type="date"
              {...register('studiedAt', {
                required: '必須項目です',
                valueAsDate: true,
              })}
            />

            <Center h="100%">
              <Button mt="12px" type="submit">
                追加
              </Button>
            </Center>
          </Box>
        </GridItem>
      </Grid>
    </DefaultLayout>
  )
}
