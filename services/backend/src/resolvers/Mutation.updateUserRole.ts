import type { MutationResolvers } from '../generates/graphql'
import { updateUser } from '../modules/user'

export const updateUserRolesResolver: NonNullable<
  MutationResolvers['updateUserRoles']
> = async (_root, { roles, userId }) => {
  const user = await updateUser(userId, { roles: roles })
  return user
}
