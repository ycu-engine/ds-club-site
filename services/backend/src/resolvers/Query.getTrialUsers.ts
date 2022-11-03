import type { QueryResolvers } from '../generates/graphql'
import { listTrialUsers } from '../modules/trialUser/index'

export const getTrialUserResolver: NonNullable<
  QueryResolvers['getTrialUsers']
> = async () => {
  const users = await listTrialUsers()
  return users
}
