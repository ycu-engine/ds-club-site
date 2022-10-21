import type { TrialUserResolvers } from '../generates/graphql'
import { getUser } from '../modules/user'

export const TrialUserMenterResolver: NonNullable<
  TrialUserResolvers['menter']
> = async (root) => {
  if (!root.menterId) {
    return null
  }
  const menter = await getUser(root.menterId)
  return menter
}
