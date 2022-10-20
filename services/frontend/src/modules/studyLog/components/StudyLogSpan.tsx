import { Box, Center, Spinner, Text } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { InputBox } from '../../../components/InputForm/InputBox'
import type { StudyLog_StudyLogGraphFragment } from '../../../generates/graphql'
import { COLORS } from '../../../theme'
import type { StudyLogGraphProps } from '../components/StudyLogGraph'

const StudyLogGraph = dynamic<StudyLogGraphProps>(
  () => import('../components/StudyLogGraph').then((mod) => mod.StudyLogGraph),
  {
    loading: () => (
      <Center>
        <Spinner size="lg" />
      </Center>
    ),
    ssr: false,
  },
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
type StudyLogSpanProps = {
  data: StudyLog_StudyLogGraphFragment[]
}
export const StudyLogSpan = ({ data }: StudyLogSpanProps) => {
  const now = getDate(0)
  const six_days_ago = getDate(6)
  const [span, setSpan] = useState<InputSpan>({ end: now, start: six_days_ago })
  const handleStartInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpan(() => ({ ...span, start: event.target.value }))
  }
  const handleEndInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpan(() => ({ ...span, end: event.target.value }))
  }

  return (
    <Box
      bg={COLORS.white}
      borderRadius="20px"
      borderWidth="2px"
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
        <StudyLogGraph data={data} />
      </Box>
    </Box>
  )
}
