import { Box, List, ListItem, Text } from '@chakra-ui/react'
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import type { CategoricalChartProps } from 'recharts/types/chart/generateCategoricalChart'
import type {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent'
import type { ContentType } from 'recharts/types/component/Tooltip'
import type { StudyLogGraph_StudyLogFragment } from '../../../generates/graphql'

const TooltipContent: ContentType<ValueType, NameType> = ({
  active,
  payload,
}) => {
  const item = payload?.[0]?.payload as StudyLogGraph_StudyLogFragment

  if (active && item) {
    return (
      <Box
        bg="whiteAlpha.700"
        border="1px"
        borderColor="gray.300"
        px="2"
        py="1"
      >
        <Text className="tooltipLabel">
          {new Date(item.studiedAt.iso).toLocaleDateString()}
        </Text>

        <Text className="tooltipDesc">{`${item.studyTime}分`}</Text>

        <List>
          <ListItem>{item.studyContent}</ListItem>
        </List>
      </Box>
    )
  }

  return null
}

export type StudyLogGraphProps = Omit<CategoricalChartProps, 'data'> & {
  data: StudyLogGraph_StudyLogFragment[]
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
        dataKey="studiedAt.iso"
        tickFormatter={(date: string) => new Date(date).toLocaleDateString()}
      />

      <YAxis />

      <Line dataKey="studyTime" stroke="#8884d8" type="monotone" />

      <Tooltip content={TooltipContent} />
    </LineChart>
  )
}
