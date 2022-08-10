import { Box, List, ListItem, Text } from '@chakra-ui/react'
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import type { CategoricalChartProps } from 'recharts/types/chart/generateCategoricalChart'
import type {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent'
import type { ContentType } from 'recharts/types/component/Tooltip'

/**
 * 仮のタイプ。APIができたら、そっちに変更する
 */
type StudyLog = {
  amount: number
  week: Date
  contents: string[]
}

const TooltipContent: ContentType<ValueType, NameType> = ({
  active,
  payload,
}) => {
  const item = payload?.[0]?.payload as StudyLog | undefined
  if (active && item) {
    return (
      <Box
        bg="whiteAlpha.700"
        border="1px"
        borderColor="gray.300"
        px="2"
        py="1"
      >
        <Text className="tooltipLabel">{item.week.toLocaleDateString()}</Text>

        <Text className="tooltipDesc">{`${item.amount}分`}</Text>

        <List>
          {item.contents.map((content) => (
            <ListItem key={content}>{content}</ListItem>
          ))}
        </List>
      </Box>
    )
  }

  return null
}

export type StudyLogGraphProps = Omit<CategoricalChartProps, 'data'> & {
  data: StudyLog[]
}

export const StudyLogGraph = ({ ...props }: StudyLogGraphProps) => {
  return (
    <LineChart
      height={400}
      margin={{ bottom: 5, left: 0, right: 20, top: 5 }}
      width={400}
      {...props}
    >
      <CartesianGrid stroke="#ccc" />

      <XAxis
        dataKey="week"
        tickFormatter={(date: Date) => date.toLocaleDateString()}
      />

      <YAxis />

      <Line dataKey="amount" stroke="#8884d8" type="monotone" />

      <Tooltip content={TooltipContent} />
    </LineChart>
  )
}
