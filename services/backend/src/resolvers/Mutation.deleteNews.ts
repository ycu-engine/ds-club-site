import type { MutationResolvers } from '../generates/graphql'
import { deleteNews } from '../modules/news'

export const deleteNewsResolver: MutationResolvers['deleteNews'] = async (
  _root,
  { id },
) => {
  try {
    const news = await deleteNews(id)
    return news
  } catch (error) {
    console.error(error)
    throw new Error('不明なエラーが発生しました')
  }
}
