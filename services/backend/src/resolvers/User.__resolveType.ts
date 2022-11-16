import type { UserResolvers } from '../generates/graphql'
import { UserRole } from '../generates/graphql'

export const __resolveTypeResolve: NonNullable<
  UserResolvers['__resolveType']
> = (user) => {
  if (user.roles.includes(UserRole.Trial)) {
    return 'TrialUser'
  }
  return 'RegularUser'
}
