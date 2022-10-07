import type { RegularUserResolvers } from '../generates/graphql'
import { listStudyLogs } from '../modules/studyLog'

export const studyLogsResolver: NonNullable<
  RegularUserResolvers['studyLogs']
> = async (regularUser, _) => {
  const studyLogs = await listStudyLogs(regularUser.id)
  return studyLogs
}
