import { Box, Grid, GridItem, Text } from '@chakra-ui/react'

import { StudyLogInput } from '../components/StudyLogInput'
import { StudyLogSpan } from '../components/StudyLogSpan'

export const StudyLogPage = () => {
  return (
    <Grid
      gap={6}
      templateColumns="repeat(2, 1fr)"
      templateRows="repeat(5, 1fr)"
    >
      <GridItem colSpan={1} rowSpan={5} w="100%">
        <StudyLogSpan />
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
        <StudyLogInput />
      </GridItem>
    </Grid>
  )
}
