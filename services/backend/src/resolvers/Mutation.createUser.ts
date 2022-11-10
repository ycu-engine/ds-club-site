import type { MutationResolvers } from '../generates/graphql'
import { createRegularUser } from '../modules/regularUser'

export const createUserResolver: NonNullable<
  MutationResolvers['createUser']
> = async (_root, { input }, { user }) => {
  if (!user) {
    throw new Error('ログインされていません')
  }
  const log = await createRegularUser({
    ...input,
  })
  return log
}
