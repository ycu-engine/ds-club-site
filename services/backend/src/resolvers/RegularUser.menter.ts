import { getUser } from '../modules/user'
import type { RegularUserResolvers } from '../generates/graphql'

export const menterResolver: NonNullable<
  RegularUserResolvers['menter']
> = async (regularUser, _args) => {
  if (!regularUser.menterId) {
    return null
  }
  return getUser(regularUser.menterId)
}