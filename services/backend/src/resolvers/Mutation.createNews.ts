import type { MutationResolvers } from '../generates/graphql'
import { UserRole } from '../generates/graphql'
import { createNews } from '../modules/news'

export const createNewsResolver: MutationResolvers['createNews'] = async (
  _root,
  { title, body },
  { user },
) => {
  if (!user) {
    throw new Error('ログインしてください')
  }
  if (
    !user.roles.includes(UserRole.Admin) &&
    !user.roles.includes(UserRole.Staff)
  ) {
    throw new Error('権限がありません')
  }
  return createNews({ body, title })
}
