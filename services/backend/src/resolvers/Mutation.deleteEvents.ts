import type { MutationResolvers } from '../generates/graphql'
import { deleteEvent, listEvent } from '../modules/event'

export const deleteEventsResolver: NonNullable<
  MutationResolvers['deleteEvents']
> = async (_root, { title }) => {
  // 後で認証処理を追加する
  const events = await listEvent((collection) =>
    collection.where('title', '==', title),
  )
  const deletedEvents = await Promise.all(
    events.map((event) => deleteEvent(event.id)),
  )
  return deletedEvents
}
