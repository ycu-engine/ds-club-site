import { Box, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import { filter } from 'graphql-anywhere'
import { Loading } from '../../../components/Loading'
import {
  StudyLog_StudyLogGraphFragment,
  StudyLog_StudyLogGraphFragmentDoc,
  UserRole,
  useStudyLogPageQuery,
} from '../../../generates/graphql'
import { COLORS } from '../../../theme'

import { StudyLogInput } from '../components/StudyLogInput'
import { StudyLogSpan } from '../components/StudyLogSpan'

const rolesToMemberStatus = (roles: UserRole[]): string => {
  if (roles.includes(UserRole.Admin) || roles.includes(UserRole.Staff)) {
    return '運営'
  }
  return '一般会員'
}

type StudyLogPageProps = {
  userId: string
}
export const StudyLogPage = ({ userId }: StudyLogPageProps) => {
  const { data, loading } = useStudyLogPageQuery({
    variables: { userId: userId },
  })

  if (loading) {
    return <Loading />
  }
  if (!data) {
    return <Heading>データが見つかりませんでした</Heading>
  }
  const user = data.getUser
  const studyLogs = user.studyLogs

  return (
    <Grid
      gap={6}
      p={6}
      templateColumns="repeat(2, 1fr)"
      templateRows="repeat(5, 1fr)"
    >
      <GridItem colSpan={1} rowSpan={5} w="100%">
        <StudyLogSpan
          data={filter<StudyLog_StudyLogGraphFragment[]>(
            StudyLog_StudyLogGraphFragmentDoc,
            studyLogs,
          )}
        />
      </GridItem>

      <GridItem colSpan={1} rowSpan={2} w="100%">
        <Box
          bg={COLORS.white}
          borderRadius="20px"
          borderWidth="2px"
          overflow="hidden"
          p="12px"
        >
          <Text fontSize={24}>名前：{user.name}</Text>

          <Text fontSize={24}>会員：{rolesToMemberStatus(user.roles)}</Text>
        </Box>
      </GridItem>

      <GridItem colSpan={1} rowSpan={3} w="100%">
        <StudyLogInput userId={userId} />
      </GridItem>
    </Grid>
  )
}
