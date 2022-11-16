import type { QueryResolvers } from '../generates/graphql'
import { UserRole } from '../generates/graphql'
import { listStudyLogs } from '../modules/studyLog'

export const getStudyLogsResolver: NonNullable<
  QueryResolvers['getStudyLogs']
> = async (_root, { userId }, { user }) => {
  // 管理者or運営権限もしくは同一ユーザーのみ
  if (
    !user?.roles.includes(UserRole.Admin) &&
    !user?.roles.includes(UserRole.Staff)
  ) {
    if (user?.id !== userId) {
      throw new Error('同一ユーザーでないと取得できません')
    }
  }
  const logs = await listStudyLogs(userId, (collection) =>
    collection.orderBy('studiedAt', 'asc'),
  )
  if (!logs) {
    return []
  }
  return logs
}
