import type { FirestoreDataConverter } from 'firebase-admin/firestore'
import { z } from 'zod'
import { timestamp } from '../../clients/firebase/timestamp'

export const TrialApplicationModelSchema = z.object({
  affiliation: z.string(),
  createdAt: timestamp,
  email: z.string().email(),
  name: z.string(),
  updatedAt: timestamp,
})

export type TrialApplicationModel = z.infer<typeof TrialApplicationModelSchema>

export const TrialApplicationModelConverter: FirestoreDataConverter<TrialApplicationModel> =
  {
    fromFirestore(snapshot) {
      return TrialApplicationModelSchema.parse(snapshot.data())
    },
    toFirestore(modelObject) {
      return modelObject
    },
  }
