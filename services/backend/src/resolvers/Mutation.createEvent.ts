import type { MutationResolvers } from '../generates/graphql'
import { createEvent } from '../modules/event'

export const createEventResolver: MutationResolvers['createEvent'] = async (
  _,
  { input },
) => {
  // 後で認証処理を記述する
  const event = await createEvent(input)
  return event
}
