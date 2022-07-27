import type { MutationResolvers } from '../generates/graphql'
import { updateUser } from '../modules/user'

export const updateUserRankResolver: NonNullable<
  MutationResolvers['updateUserRank']
> = async (_root, { rank, userId }) => {
  const user = await updateUser(userId, { currentRank: rank })
  return user
}
