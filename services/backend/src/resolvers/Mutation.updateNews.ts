import type { MutationResolvers } from '../generates/graphql'
import { UserRole } from '../generates/graphql'
import { updateNews } from '../modules/news'

export const updateNewsResolver: MutationResolvers['updateNews'] = async (
  _root,
  { id, input },
  { user },
) => {
  if (!user) {
    throw new Error('ログインしてください')
  }
  if (
    !(
      user.roles.includes(UserRole.Admin) || user.roles.includes(UserRole.Staff)
    )
  ) {
    throw new Error('権限がありません')
  }
  try {
    return await updateNews(id, { ...input })
  } catch (error) {
    console.error(error)
    throw new Error('不明なエラーが発生しました')
  }
}
