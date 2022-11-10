import { auth } from '../clients/firebase'
import { UserRole } from '../generates/graphql'
import type { MutationResolvers } from '../generates/graphql'
import { getTrialUser } from '../modules/trialUser'

export const enableTrialUserResolver: NonNullable<
  MutationResolvers['enableTrialUser']
> = async (_root, { userId }, { user }) => {
  try {
    const trialUser = await getTrialUser(userId)
    if (!trialUser) {
      return false
    }

    if (
      !user?.roles.includes(UserRole.Admin) &&
      !user?.roles.includes(UserRole.Staff)
    ) {
      throw new Error('権限がありません')
    }

    await auth.updateUser(userId, {
      disabled: false,
    })
    return true
  } catch (error) {
    return false
  }
}
