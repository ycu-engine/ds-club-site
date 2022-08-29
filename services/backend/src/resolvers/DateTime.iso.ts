import type { DateTimeResolvers } from '../generates/graphql'

export const isoResolver: NonNullable<DateTimeResolvers['iso']> = (date) => {
  return date.toISOString()
}
