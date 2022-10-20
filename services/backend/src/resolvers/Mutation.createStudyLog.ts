import type { MutationResolvers } from '../generates/graphql'
import { createStudyLog } from '../modules/studyLog'

export const createStudyLogResolver: NonNullable<
  MutationResolvers['createStudyLog']
> = async (_root, { input }) => {
  // if (!user) {
  //   throw new Error('ログインされていません')
  // }
  const log = await createStudyLog({
    ...input,
    studiedAt: new Date(input.studiedAt).getTime(),
  })
  return log
}
