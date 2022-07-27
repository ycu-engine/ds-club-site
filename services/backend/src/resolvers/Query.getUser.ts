import type { QueryResolvers } from '../generates/graphql'
import { getUser } from '../modules/user'

export const getUserResolver: NonNullable<QueryResolvers['getUser']> = async (
  _root,
  { id },
) => {
  const user = (await getUser(id)) as any
  if (!user) {
    throw new Error('User not found')
  }
  return user
}
