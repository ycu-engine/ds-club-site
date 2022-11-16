import {
  Box,
  BoxProps,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spinner,
  Text,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import dynamic from 'next/dynamic'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
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

const getDate = (n: number) => {
  const now = new Date()
  if (n) {
    now.setDate(now.getDate() - n)
  }

  // yyyy-MM-dd形式にしないとデフォルト値の設定がうまくいかない
  const fmtDate = format(now, 'yyyy-MM-dd')
  return fmtDate
}

type setSpanForm = {
  start: string
  end: string
}

type StudyLogSpanProps = {
  data: StudyLog_StudyLogGraphFragment[]
} & BoxProps
export const StudyLogSpan = ({ data, ...props }: StudyLogSpanProps) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useForm<setSpanForm>({
    defaultValues: {
      end: getDate(0),
      start: getDate(6),
    },
  })
  const start = watch('start')
  const end = watch('end')
  useEffect(() => {
    console.info(start, end)
  }, [start, end])

  const filteredData: StudyLog_StudyLogGraphFragment[] = useMemo(() => {
    return data.filter((log) => {
      const studiedAt = new Date(log.studiedAt)
      return studiedAt >= new Date(start) && studiedAt <= new Date(end)
    })
  }, [data, start, end])

  return (
    <Box
      bg={COLORS.white}
      borderRadius="20px"
      borderWidth="2px"
      overflow="hidden"
      p="12px"
      {...props}
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
        <FormControl isInvalid={errors.start ? true : false}>
          <FormLabel fontWeight="semibold" htmlFor="start">
            開始日
          </FormLabel>

          <Input
            id="start"
            placeholder="開始日"
            type="date"
            value={start}
            {...register('start', {})}
          />

          <FormErrorMessage>
            {errors.start ? errors.start.message : null}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.end ? true : false}>
          <FormLabel fontWeight="semibold" htmlFor="end">
            終了日
          </FormLabel>

          <Input
            id="end"
            placeholder="終了日"
            type="date"
            value={end}
            {...register('end', {})}
          />

          <FormErrorMessage>
            {errors.end ? errors.end.message : null}
          </FormErrorMessage>
        </FormControl>

        <Text>まで</Text>
      </Box>

      <Box
        borderRadius="20px"
        borderWidth="2px"
        mt="12px"
        overflow="hidden"
        p="12px"
      >
        {filteredData.length ? (
          <StudyLogGraph data={filteredData} />
        ) : (
          <Text>データがありません</Text>
        )}
      </Box>
    </Box>
  )
}
