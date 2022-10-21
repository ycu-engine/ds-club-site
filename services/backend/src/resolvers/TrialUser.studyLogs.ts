import type { TrialUserResolvers } from '../generates/graphql'
import { listStudyLogs } from '../modules/studyLog'

export const TrialUserStudyLogsResolver: NonNullable<
  TrialUserResolvers['studyLogs']
> = async (trialUser, _, { user }) => {
  if (!user) {
    throw new Error('ログインされていません')
  }
  const studyLogs = listStudyLogs(trialUser.id, (collection) =>
    collection.orderBy('studiedAt', 'asc'),
  )
  return studyLogs
}
