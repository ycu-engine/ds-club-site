import { UserRole } from '../generates/graphql'
import type { MutationResolvers } from '../generates/graphql'
import { updateRegularUser } from '../modules/regularUser'

export const removeMenterResolver: NonNullable<
  MutationResolvers['removeMenter']
> = async (_root, { userId }, { user }) => {
  if (!user) {
    throw new Error('ログインされていません')
  }
  // ADMINとSTAFFしかメンターを追加できない
  if (
    !user.roles.includes(UserRole.Admin) &&
    !user.roles.includes(UserRole.Staff)
  ) {
    throw new Error('権限がありません')
  }
  return await updateRegularUser(userId, { menterId: null })
}
