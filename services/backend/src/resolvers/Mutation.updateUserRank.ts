import type { MutationResolvers } from '../generates/graphql'
import { updateRegularUser } from '../modules/regularUser'

export const updateUserRankResolver: NonNullable<
  MutationResolvers['updateUserRank']
> = async (_root, { rank, userId }) => {
  const user = await updateRegularUser(userId, { currentRank: rank })
  return user
}
