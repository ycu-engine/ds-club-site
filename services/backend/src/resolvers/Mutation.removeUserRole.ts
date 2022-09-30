import type { MutationResolvers } from '../generates/graphql'
import { getUser, updateUser } from '../modules/user'

export const removeUserRoleResolver: NonNullable<
  MutationResolvers['removeUserRole']
> = async (_root, { role, userId }) => {
  const user = await getUser(userId)
  if (user) {
    const roles = user.roles
    const index = roles.indexOf(role)
    roles.splice(index, 1)
    const updatedUser = await updateUser(userId, { roles: roles })
    return updatedUser
  }
  throw new Error('ユーザーが見つかりませんでした')
}
