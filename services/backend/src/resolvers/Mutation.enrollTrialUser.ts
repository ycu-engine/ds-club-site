import type { MutationResolvers } from '../generates/graphql'
import { PaymentStatus, UserRole } from '../generates/graphql'
import { getTrialUser, removeTrialUser } from '../modules/trialUser'
import {
  createRegularUserWithId,
  updateRegularUser,
} from '../modules/regularUser'

export const enrollTrialUserResolver: NonNullable<
  MutationResolvers['enrollTrialUser']
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

  const enrollUser = await createRegularUserWithId(trialUser?.id, {
    email: trialUser.email,
    name: trialUser.name,
  })
  // TrialUser を削除
  if (enrollUser) await removeTrialUser(trialUser.id)

  // 色々変更、できればここら辺もcreateUserWithIdの引数にしたい
  const updatedEnrollUser = await updateRegularUser(enrollUser.id, {
    menterId: trialUser?.menterId || null,
    paymentStatus: PaymentStatus.Paid,
  })

  return updatedEnrollUser
}
