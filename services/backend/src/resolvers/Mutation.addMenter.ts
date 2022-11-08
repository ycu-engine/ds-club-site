import type { MutationResolvers } from '../generates/graphql'
import { getRegularUser, updateRegularUser } from '../modules/regularUser'
import { UserRole } from '../generates/graphql'

export const addMenterResolver: NonNullable<
  MutationResolvers['addMenter']
> = async (_root, { userId, menterId }, { user }) => {
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
  const menter = await getRegularUser(menterId)
  if (!menter) {
    throw new Error('Menter not found')
  }
  return await updateRegularUser(userId, { menterId })
}
