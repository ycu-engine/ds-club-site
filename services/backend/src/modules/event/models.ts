import type { FirestoreDataConverter } from 'firebase-admin/firestore'
import { z } from 'zod'
import { timestamp } from '../../clients/firebase/timestamp'

export const EventModelSchema = z.object({
  createdAt: timestamp,
  end: timestamp,
  location: z.string(),
  start: timestamp,
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
