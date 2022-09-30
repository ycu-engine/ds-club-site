import type { QueryResolvers } from '../generates/graphql'
import { listNews } from '../modules/news'

export const getNewsListResolver: NonNullable<
  QueryResolvers['getNewsList']
> = async (_root, _args, _context) => {
  const news = await listNews()
  if (!news) {
    throw new Error('News not found')
  }
  return news
}
