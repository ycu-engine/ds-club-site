import type { UserResolvers } from '../generates/graphql'

export const __resolveTypeResolve: NonNullable<
  UserResolvers['__resolveType']
> = (user) => {
  if ('currentRank' in user) {
    return 'RegularUser'
  }
  return 'TrialUser'
}
