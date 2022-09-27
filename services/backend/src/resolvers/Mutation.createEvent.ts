import type { MutationResolvers } from '../generates/graphql'
import { createEvent } from '../modules/event'

export const createEventResolver: MutationResolvers['createEvent'] = async (
  _,
  { input },
) => {
  // 後で認証処理を記述する
  // startとendの順序が正しいかどうかを確認する
  if (new Date(input.start.iso) > new Date(input.end.iso)) {
    throw new Error('Start date must be before end date')
  }
  const event = await createEvent({
    ...input,
    end: new Date(input.end.iso).getTime(),
    start: new Date(input.start.iso).getTime(),
  })
  return event
}
