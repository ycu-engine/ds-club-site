import type { QueryResolvers } from '../generates/graphql'
import { listNews } from '../modules/news'

export const getNewsResolver: NonNullable<QueryResolvers['getNews']> = async (
  _root,
  _args,
  context,
) => {
  // ユーザ認証？
  if (!context.user) {
    throw new Error('User not autherized')
  }
  const news = await listNews()
  if (!news) {
    throw new Error('News not found')
  }
  return news
}
