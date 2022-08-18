import type { StudyLogResolvers } from '../generates/graphql'
import { getUser } from '../modules/user'

export const userResolver: NonNullable<StudyLogResolvers['user']> = async (
  studyLog,
  _,
) => {
  if (!studyLog.userId) {
    throw new Error('User not found')
  }

  const user = await getUser(studyLog.userId)
  if (!user) {
    throw new Error('User not found')
  }
  return user
}
