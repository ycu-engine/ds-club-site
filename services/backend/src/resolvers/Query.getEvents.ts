import type { QueryResolvers } from '../generates/graphql'
import { listEvent } from '../modules/event'

export const getEventsResolver: QueryResolvers['getEvents'] = async () => {
  // 誰でもOK
  const events = await listEvent()
  return events
}
