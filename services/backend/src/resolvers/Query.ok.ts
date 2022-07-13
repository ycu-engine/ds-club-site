import type { QueryResolvers } from '../generates/graphql'

export const okResolver: QueryResolvers['ok'] = async (
  _root,
  _args,
  _ctx,
  _info,
) => {
  return Promise.resolve(true)
}
