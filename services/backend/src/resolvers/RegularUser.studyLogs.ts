import type { RegularUserResolvers } from '../generates/graphql'
import { listStudyLogs } from '../modules/studyLog'

export const regularUserStudyLogsResolver: NonNullable<
  RegularUserResolvers['studyLogs']
> = async (regularUser, _, { user }) => {
  if (!user) {
    throw new Error('login required')
  }
  const studyLogs = await listStudyLogs(regularUser.id, (collection) =>
    collection.orderBy('studiedAt', 'asc'),
  )
  if (!studyLogs) {
    return []
  }
  return studyLogs
}
