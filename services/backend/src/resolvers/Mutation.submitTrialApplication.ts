import type { MutationResolvers } from '../generates/graphql'
import { createTrialApplication } from '../modules/trialApplication'

export const submitTrialApplicationResolver: NonNullable<
  MutationResolvers['submitTrialApplication']
> = async (_root, { input }) => {
  try {
    await createTrialApplication(input)
    return true
  } catch {
    return false
  }
}
