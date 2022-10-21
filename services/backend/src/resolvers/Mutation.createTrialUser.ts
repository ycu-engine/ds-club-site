import type { MutationResolvers } from '../generates/graphql'
import { createTrialUser } from '../modules/trialUser'

export const createTrialUserResolver: NonNullable<
  MutationResolvers['createTrialUser']
> = async (_root, { input }) => {
  return await createTrialUser({ ...input })
}
