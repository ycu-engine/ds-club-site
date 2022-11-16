import { auth } from '../clients/firebase'
import type { TrialUserResolvers } from '../generates/graphql'

export const TrialUserDisabledResolver: NonNullable<
  TrialUserResolvers['disabled']
> = async (trialUser) => {
  const authUser = await auth.getUser(trialUser.id)
  return authUser.disabled
}
