import type { MutationResolvers } from '../generates/graphql'
import { createUser } from '../modules/user'

export const createUserResolver: NonNullable<
  MutationResolvers['createUser']
> = async (_root, { input }, { user }) => {
  if (!user) {
    throw new Error('ログインされていません')
  }
  const log = await createUser({
    ...input,
  })
  return log
}
