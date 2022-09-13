import type { QueryResolvers } from '../generates/graphql'
import { listStudyLogs } from '../modules/studyLog'

export const getStudyLogResolver: NonNullable<
  QueryResolvers['getStudyLog']
> = async (_root, { userId }, { user }) => {
  if (user?.id !== userId) {
    throw new Error('学習記録を見る権限がありません')
  }
  const log = await listStudyLogs(userId)
  if (!log) {
    throw new Error('User not found')
  }
  return log
}
