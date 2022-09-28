import type { MutationResolvers } from '../generates/graphql'
import { createWeeklyRepeatEvent } from '../modules/event'

export const createWeeklyRepeatEventResolver: NonNullable<
  MutationResolvers['createWeeklyRepeatEvent']
> = async (_, { input }) => {
  // 後で認証処理を追加する
  if (new Date(input.start) > new Date(input.end)) {
    throw new Error('Start date must be before end date')
  }
  if (new Date(input.start) > new Date(input.repeatUntil)) {
    throw new Error('Start date must be before repeatUntil date')
  }
  return await createWeeklyRepeatEvent({
    ...input,
    end: new Date(input.end).getTime(),
    repeatUntil: new Date(input.repeatUntil).getTime(),
    start: new Date(input.start).getTime(),
  })
}
