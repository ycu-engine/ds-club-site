import type { MutationResolvers } from '../generates/graphql'
import { getUser, updateUser } from '../modules/user'

export const updateUserResovler: NonNullable<
  MutationResolvers['updateUser']
> = async (_root, args) => {
  const beforeUser = await getUser(args.userId)
  if (!beforeUser) {
    throw new Error('User not found')
  }
  const user = await updateUser(args.userId, {
    currentRank: args.input.currentRank || beforeUser.currentRank,
    name: args.input.name || beforeUser.name,
    paymentStatus: args.input.paymentStatus || beforeUser.paymentStatus,
  })
  return user
}
