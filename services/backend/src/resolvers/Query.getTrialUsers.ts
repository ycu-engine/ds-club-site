import type { QueryResolvers } from '../generates/graphql'
import { listTrialUsers } from '../modules/trialUser/index'
import type { OrderByDirection } from 'firebase-admin/firestore'

export const getTrialUserResolver: NonNullable<
  QueryResolvers['getTrialUsers']
> = async (_, { order, orderBy }) => {
  let orderByDirection: OrderByDirection = 'desc'
  if (order !== 'desc') {
    orderByDirection = 'asc'
  }

  const users = await listTrialUsers((collection) =>
    collection.orderBy(orderBy || '', orderByDirection),
  )

  return users
}
