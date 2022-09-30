import type { RegularUserResolvers } from '../generates/graphql'
import { listUsers } from '../modules/user'

export const menteeResolver: NonNullable<
  RegularUserResolvers['mentee']
> = async (regularUser, _args) => {
  const users = listUsers((collection) =>
    collection.where('menterId', '==', regularUser.id),
  )
  return await users
}
