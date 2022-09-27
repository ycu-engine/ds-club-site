import { firestore } from '../../clients/firebase'
import { FieldValue, Timestamp } from 'firebase-admin/firestore'
import { eventModelConverter } from './models'
import type { EventModelMapper } from './types'

const eventCollection = firestore
  .collection('event')
  .withConverter(eventModelConverter)

export const listEvent = async (): Promise<EventModelMapper[]> => {
  const snapshot = await eventCollection.get()
  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}

export const getEvent = async (
  id: string,
): Promise<EventModelMapper | null> => {
  const snapshot = await eventCollection.doc(id).get()
  const event = snapshot.data()
  if (!event) {
    return null
  }
  return { ...event, id: snapshot.id }
}

export const createEvent = async (obj: {
  title: string
  start: number
  end: number
  location: string
}): Promise<EventModelMapper> => {
  const ref = await eventCollection.add({
    ...obj,
    createdAt: FieldValue.serverTimestamp(),
    end: Timestamp.fromMillis(obj.end),
    start: Timestamp.fromMillis(obj.start),
    updatedAt: FieldValue.serverTimestamp(),
  })
  const event = await getEvent(ref.id)
  if (!event) {
    throw new Error('Event not created')
  }
  return event
}
