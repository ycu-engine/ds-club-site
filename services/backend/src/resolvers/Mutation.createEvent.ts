import type { MutationResolvers } from '../generates/graphql'
import { createEvent } from '../modules/event'

export const createEventResolver: NonNullable<
  MutationResolvers['createEvent']
> = async (_, { input }) => {
  // 後で認証処理を記述する
  // startとendの順序が正しいかどうかを確認する
  if (new Date(input.start) > new Date(input.end)) {
    throw new Error('Start date must be before end date')
  }

  const event = await createEvent({
    ...input,
    end: new Date(input.end).getTime(),
    start: new Date(input.start).getTime(),
  })
  return event
}
