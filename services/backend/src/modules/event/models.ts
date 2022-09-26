import type { FirestoreDataConverter } from 'firebase-admin/firestore'
import { z } from 'zod'
import { timestamp } from '../../clients/firebase/timestamp'

export const EventModelSchema = z.object({
  createdAt: timestamp,
  end: z.string(),
  location: z.string(),
  start: z.string(),
  title: z.string(),
  updatedAt: timestamp,
})

export type EventModel = z.infer<typeof EventModelSchema>

export const eventModelConverter: FirestoreDataConverter<EventModel> = {
  fromFirestore(snapshot) {
    return EventModelSchema.parse(snapshot.data())
  },
  toFirestore(modelObject) {
    return modelObject
  },
}
