import type { QueryResolvers } from '../generates/graphql'
import { getStudyLog } from '../modules/studyLog'

export const getStudyLogResolver: NonNullable<
  QueryResolvers['getStudyLog']
> = async (_root, { id, userId }) => {
  const log = await getStudyLog(id, userId)
  if (!log) {
    throw new Error('User not found')
  }
  return log
}
