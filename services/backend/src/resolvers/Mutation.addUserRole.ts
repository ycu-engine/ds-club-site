import type { MutationResolvers } from '../generates/graphql'
import { getUser, updateUser } from '../modules/user'

export const addUserRolesResolver: NonNullable<
  MutationResolvers['addUserRole']
> = async (_root, { role, userId }) => {
  const user = await getUser(userId)
  if (user) {
    const roles = user.roles
    roles.push(role)
    const updatedUser = await updateUser(userId, { roles: roles })
    return updatedUser
  }
  throw new Error('ユーザーが見つかりませんでした')
}
