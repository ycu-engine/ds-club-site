import type { QueryResolvers } from '../generates/graphql'
import { getMenter } from '../modules/user'

export const getMenterResolver: NonNullable<
  QueryResolvers['getMenter']
> = async (_root, { id }) => {
  const user = await getMenter(id)
  if (!user) {
    throw new Error('Menter not found')
  }
  return user
}
