import { Box, Text } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../clients/firebase'
import { InputBox } from '../../../components/InputForm/InputBox'
import { useStudyLogPageQuery } from '../../../generates/graphql'
import type { StudyLogGraphProps } from '../components/StudyLogGraph'

const StudyLogGraph = dynamic<StudyLogGraphProps>(
  () => import('../components/StudyLogGraph').then((mod) => mod.StudyLogGraph),
  { loading: () => <div>loading...</div>, ssr: false },
)

type InputSpan = {
  end: string
  start: string
}

const getDate = (n: number) => {
  const date = new Date()
  if (n) {
    date.setDate(date.getDate() - n)
  }

  const y = date.getFullYear().toString()
  const m = date.getMonth().toString()
  const d = date.getDate().toString()
  const now = y + '/' + m + '/' + d
  return now
}

export const StudyLogSpan = () => {
  const now = getDate(0)
  const six_days_ago = getDate(6)
  const [span, setSpan] = useState<InputSpan>({ end: now, start: six_days_ago })
  const handleStartInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpan(() => ({ ...span, start: event.target.value }))
  }
  const handleEndInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpan(() => ({ ...span, end: event.target.value }))
  }

  const [user] = useAuthState(auth)

  const { data, loading, error } = useStudyLogPageQuery({
    skip: !user,
    variables: { userId: user?.uid ?? '' },
  })

  if (loading) {
    return <div>loading</div>
  }
  if (error) {
    console.error(error)
    return <div>エラーが発生しました</div>
  }
  if (!data) {
    return <div>データが見つかりませんでsした</div>
  }

  return (
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
        <InputBox
          onChange={handleStartInput}
          title="開始日"
          type="date"
          value={span.start}
        />

        <InputBox
          onChange={handleEndInput}
          placeholder={span.end}
          title="終了日"
          type="date"
          value="2022/5/13"
        />

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
  )
}
