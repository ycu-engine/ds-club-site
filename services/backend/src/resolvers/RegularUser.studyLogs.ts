import type { RegularUserResolvers } from '../generates/graphql'
import { listStudyLogs } from '../modules/studyLog'

export const studyLogsResolver: NonNullable<
  RegularUserResolvers['studyLogs']
> = async (regularUser, _, { user }) => {
  if (!user) {
    throw new Error('ログインされていません')
  }
  const studyLogs = await listStudyLogs(regularUser.id, (collection) =>
    collection.orderBy('studiedAt', 'asc'),
  )
  return studyLogs
}
