import type { FirestoreDataConverter } from 'firebase-admin/firestore'
import { z } from 'zod'
import { timestamp } from '../../clients/firebase/timestamp'

export const StudyLogModelSchema = z.object({
  createdAt: timestamp,
  studiedAt: timestamp,
  studyContent: z.string(),
  studyTime: z.number().int().nonnegative(),
  updatedAt: timestamp,
  userId: z.string(),
})

export type StudyLogModel = z.infer<typeof StudyLogModelSchema>

export const studyLogModelConverter: FirestoreDataConverter<StudyLogModel> = {
  fromFirestore(snapshot) {
    return StudyLogModelSchema.parse(snapshot.data())
  },
  toFirestore(modelObject) {
    return modelObject
  },
}
