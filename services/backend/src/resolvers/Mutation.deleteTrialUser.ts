import { auth } from '../clients/firebase'
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
  // authの方からも削除
  try {
    await auth.deleteUser(trialUser.id)
    await removeTrialUser(trialUser.id)
  } catch (error) {
    throw new Error('エラーが発生しました')
  }

  return trialUser
}
