import type { QueryResolvers } from '../generates/graphql'
import { listUsers } from '../modules/user'

export const listUsersResolver: NonNullable<
  QueryResolvers['listUsers']
> = async (_root) => {
  const users = await listUsers()
  if (!users) {
    throw new Error('Users not found')
  }
  return users
}
