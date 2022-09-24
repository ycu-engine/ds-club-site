import type { MutationResolvers } from '../generates/graphql'
import { addMenter } from '../modules/user'

export const addMenterResolver: NonNullable<
  MutationResolvers['addMenter']
> = async (_root, { userId, menterId }) => {
  return addMenter(userId, menterId)
}
