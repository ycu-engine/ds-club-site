import type { FirestoreDataConverter } from 'firebase-admin/firestore'
import { z } from 'zod'
import { timestamp } from '../../clients/firebase/timestamp'

export const TrialUserModelSchema = z.object({
  createdAt: timestamp,
  email: z.string().email(),
  menterId: z.string().nullable().optional(),
  name: z.string(),
  updatedAt: timestamp,
})

export type TrialUserModel = z.infer<typeof TrialUserModelSchema>

export const trialUserModelConverter: FirestoreDataConverter<TrialUserModel> = {
  fromFirestore(snapshot) {
    return TrialUserModelSchema.parse(snapshot.data())
  },
  toFirestore(modelObject) {
    return modelObject
  },
}
