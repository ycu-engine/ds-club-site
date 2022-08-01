import type { MutationResolvers } from '../generates/graphql'
import { updateUser } from '../modules/user'

export const updateUserPaymentStatusResolver: NonNullable<
  MutationResolvers['updateUserPaymentStatus']
> = async (_root, { paymentStatus, userId }) => {
  const user = await updateUser(userId, { paymentStatus })
  return user
}
