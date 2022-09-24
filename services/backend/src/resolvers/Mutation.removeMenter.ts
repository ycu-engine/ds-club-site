import type { MutationResolvers } from '../generates/graphql'
import { removeMenter } from '../modules/user'

export const removeMenterResolver: NonNullable<
  MutationResolvers['removeMenter']
> = async (_root, { userId }) => {
  return removeMenter(userId)
}
