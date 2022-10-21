import type { MutationResolvers } from '../generates/graphql'
import { createStudyLog } from '../modules/studyLog'

export const createStudyLogResolver: NonNullable<
  MutationResolvers['createStudyLog']
> = async (_root, { input }, { user }) => {
  if (!user) {
    throw new Error('ログインされていません')
  }
  const log = await createStudyLog(user.id, {
    ...input,
    studiedAt: new Date(input.studiedAt).getTime(),
  })
  return log
}
