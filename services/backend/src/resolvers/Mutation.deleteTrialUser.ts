import type { MutationResolvers } from '../generates/graphql'
import { UserRole } from '../generates/graphql'
import { getTrialUser, removeTrialUser } from '../modules/trialUser'

export const deleteTrialUserResolver: NonNullable<
  MutationResolvers['deleteTrialUser']
> = async (_root, { userId }, { user }) => {
  if (!user) {
    throw new Error('ログインされていません')
  }

  if (
    !user.roles.includes(UserRole.Admin) &&
    !user.roles.includes(UserRole.Staff)
  ) {
    throw new Error('権限がありません')
  }

  const trialUser = await getTrialUser(userId)
  if (!trialUser) {
    throw new Error('該当するユーザーが見つかりません')
  }

  await removeTrialUser(trialUser.id)

  return trialUser
}
