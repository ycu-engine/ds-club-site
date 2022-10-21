import type { QueryResolvers } from '../generates/graphql'
import { listUsers } from '../modules/user'

export const getRegularUsersResolver: NonNullable<
  QueryResolvers['getRegularUsers']
> = async () => {
  const users = await listUsers()
  return users
}
