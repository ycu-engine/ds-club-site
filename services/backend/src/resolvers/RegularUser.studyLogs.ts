import type { RegularUserResolvers } from '../generates/graphql'
import { listStudyLogs } from '../modules/studyLog'

export const studyLogsResolver: NonNullable<
  RegularUserResolvers['studyLogs']
> = async (regularUser, _, { user }) => {
  if (!user) {
    throw new Error('ログインされていません')
  }
  const studyLogs = await listStudyLogs(regularUser.id)
  // 学習日の昇順に並び替える
  studyLogs.sort((a, b) => (a.studiedAt > b.studiedAt ? 1 : -1))
  return studyLogs
}
