import type { UserResolvers } from '../generates/graphql'

export const __resolveTypeResolve: NonNullable<
  UserResolvers['__resolveType']
> = () => {
  return 'RegularUser'
}
