import type { MutationResolvers } from '../generates/graphql'
import { deleteEvent } from '../modules/event'

export const deleteEventResolver: NonNullable<
  MutationResolvers['deleteEvent']
> = async (_root, { id }) => {
  // 後で認証処理を追加する
  const event = await deleteEvent(id)
  return event
}
