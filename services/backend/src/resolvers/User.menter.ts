import { getRegularUser } from '../modules/regularUser'
import type { UserResolvers } from '../generates/graphql'

export const menterResolver: NonNullable<UserResolvers['menter']> = async (
  user,
  _args,
) => {
  if (!user.menterId) {
    return null
  }
  return getRegularUser(user.menterId)
}
