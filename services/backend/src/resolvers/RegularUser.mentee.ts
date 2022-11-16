import type { RegularUserResolvers } from '../generates/graphql'
import { listTrialUsers } from '../modules/trialUser'
import { listRegularUsers } from '../modules/regularUser'

export const menteeResolver: NonNullable<
  RegularUserResolvers['mentee']
> = async (regularUser, _args) => {
  const regularUsers = await listRegularUsers((collection) =>
    collection.where('menterId', '==', regularUser.id),
  )

  const trialUsers = await listTrialUsers((collection) =>
    collection.where('menterId', '==', regularUser.id),
  )

  return [...regularUsers, ...trialUsers]
}
