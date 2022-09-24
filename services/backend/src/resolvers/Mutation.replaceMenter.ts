import type { MutationResolvers } from '../generates/graphql'
import { replaceMenter } from '../modules/user'

export const replaceMenterResolver: NonNullable<
  MutationResolvers['replaceMenter']
> = async (_root, { userId, menterId }) => {
  return replaceMenter(userId, menterId)
}
