import type { QueryResolvers } from '../generates/graphql'
import { listRegularUsers } from '../modules/regularUser'

export const getRegularUsersResolver: NonNullable<
  QueryResolvers['getRegularUsers']
> = async () => {
  const users = await listRegularUsers()
  return users
}
