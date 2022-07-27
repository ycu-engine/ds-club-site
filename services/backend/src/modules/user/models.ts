import type { FirestoreDataConverter } from 'firebase-admin/firestore'
import { z } from 'zod'
import { timestamp } from '../../clients/firebase/timestamp'
import { PaymentStatus, RankKind } from '../../generates/graphql'

export const UserModelSchema = z.object({
  createdAt: timestamp,
  currentRank: z.nativeEnum(RankKind),
  name: z.string(),
  paymentStatus: z.nativeEnum(PaymentStatus),
  updatedAt: timestamp,
})

export type UserModel = z.infer<typeof UserModelSchema>

export const userModelConverter: FirestoreDataConverter<UserModel> = {
  fromFirestore(snapshot) {
    return UserModelSchema.parse(snapshot.data())
  },
  toFirestore(modelObject) {
    return modelObject
  },
}
