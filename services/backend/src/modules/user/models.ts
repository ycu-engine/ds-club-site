import type { FirestoreDataConverter } from 'firebase-admin/firestore'
import { z } from 'zod'
import { timestamp } from '../../clients/firebase/timestamp'
import {
  PaymentStatus,
  RankKind,
  UserRole,
  RegularUser,
} from '../../generates/graphql'

export const UserModelSchema = z.object({
  createdAt: timestamp,
  currentRank: z.nativeEnum(RankKind),
  mentee: RegularUser,
  menter: RegularUser,
  name: z.string(),
  paymentStatus: z.nativeEnum(PaymentStatus),
  roles: z.array(z.nativeEnum(UserRole)),
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
