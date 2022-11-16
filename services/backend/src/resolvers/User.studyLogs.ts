import type { UserResolvers } from '../generates/graphql'
import { listStudyLogs } from '../modules/studyLog'

export const studyLogsResolver: NonNullable<
  UserResolvers['studyLogs']
> = async (user, _, { user: loginUser }) => {
  if (!loginUser) {
    throw new Error('ログインしてください')
  }
  const studyLogs = await listStudyLogs(user.id, (collection) =>
    collection.orderBy('studiedAt', 'asc'),
  )
  if (!studyLogs) {
    return []
  }
  return studyLogs
}
