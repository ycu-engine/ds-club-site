import type { FirestoreDataConverter } from 'firebase-admin/firestore'
import { z } from 'zod'
import { timestamp } from '../../clients/firebase/timestamp'

export const NewsModelSchema = z.object({
  body: z.string(),
  createdAt: timestamp,
  title: z.string(),
  updatedAt: timestamp,
})

export type NewsModel = z.infer<typeof NewsModelSchema>

export const newsModelConverter: FirestoreDataConverter<NewsModel> = {
  fromFirestore(snapshot) {
    return NewsModelSchema.parse(snapshot.data())
  },
  toFirestore(modelObject) {
    return modelObject
  },
}
