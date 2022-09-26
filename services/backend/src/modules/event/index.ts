import { firestore } from '../../clients/firebase'
import { eventModelConverter } from './models'
import type { Event } from '../../generates/graphql'
import { FieldValue } from 'firebase-admin/firestore'

const eventCollection = firestore
  .collection('event')
  .withConverter(eventModelConverter)

export const listEvent = async (): Promise<Event[]> => {
  const snapshot = await eventCollection.get()
  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}

export const getEvent = async (id: string): Promise<Event | null> => {
  const snapshot = await eventCollection.doc(id).get()
  const event = snapshot.data()
  if (!event) {
    return null
  }
  return { ...event, id: snapshot.id }
}

export const createEvent = async (obj: {
  title: string
  start: string
  end: string
  location: string
}): Promise<Event> => {
  if (new Date(obj.start) > new Date(obj.end)) {
    throw new Error('start must be before end')
  }
  const ref = await eventCollection.add({
    ...obj,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  })
  const event = await getEvent(ref.id)
  if (!event) {
    throw new Error('Event not created')
  }
  return event
}
