import type { MutationResolvers } from '../generates/graphql'
import { updateRegularUser } from '../modules/regularUser'

export const updateUserPaymentStatusResolver: NonNullable<
  MutationResolvers['updateUserPaymentStatus']
> = async (_root, { paymentStatus, userId }) => {
  const user = await updateRegularUser(userId, { paymentStatus })
  return user
}
