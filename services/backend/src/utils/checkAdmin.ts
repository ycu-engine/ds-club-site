import { UserRole } from '../generates/graphql'
import type { UserModelMapper } from '../modules/regularUser/types'
import type { TrialUserModelMapper } from '../modules/trialUser/types'

export const checkAdmin = (
  user: UserModelMapper | TrialUserModelMapper | null,
) => {
  if (!user) {
    throw new Error('ログインしてください')
  }
  const ok =
    user.roles.includes(UserRole.Admin) || user.roles.includes(UserRole.Staff)
  if (!ok) {
    throw new Error('権限がありません')
  }
}
