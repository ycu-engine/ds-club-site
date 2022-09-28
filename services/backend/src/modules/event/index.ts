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

export const createWeeklyRepeatEvent = async (obj: {
  title: string
  start: number
  end: number
  location: string
  repeatUntil: number
}): Promise<EventModelMapper[]> => {
  const events = []
  const [startHour, startMinute] = [
    new Date(obj.start).getHours(),
    new Date(obj.start).getMinutes(),
  ]
  const [endHour, endMinute] = [
    new Date(obj.end).getHours(),
    new Date(obj.end).getMinutes(),
  ]
  for (
    let date = new Date(obj.start);
    date <= new Date(obj.repeatUntil);
    date.setDate(date.getDate() + 7)
  ) {
    const start = new Date(date)
    start.setHours(startHour)
    start.setMinutes(startMinute)
    const end = new Date(date)
    end.setHours(endHour)
    end.setMinutes(endMinute)
    const event = await createEvent({
      end: end.getTime(),
      location: obj.location,
      start: start.getTime(),
      title: obj.title,
    })

    events.push(event)
  }
  return events
}

export const deleteEvent = async (id: string): Promise<EventModelMapper> => {
  const event = await getEvent(id)
  if (!event) {
    throw new Error('Event not found')
  }
  await eventCollection.doc(id).delete()
  return event
}
