import type { TrialUserResolvers } from '../generates/graphql'

export const TrialUserExpiredAtResolver: TrialUserResolvers['expiredAt'] = (
  trialUser,
) => {
  const expiredAt = new Date(trialUser.createdAt).setMonth(
    new Date(trialUser.createdAt).getMonth() + 1,
  )

  return `${new Date(expiredAt).getFullYear()}-${
    new Date(expiredAt).getMonth() + 1
  }-${new Date(expiredAt).getDate()}`
}
