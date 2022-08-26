import { FieldValue } from 'firebase-admin/firestore'
import { firestore } from '../../clients/firebase'

import { studyLogModelConverter } from './models'
import type { StudyLogModelMapper } from './types'

const getStudyLogCollection = (userId: string) =>
  firestore
    .collection('users')
    .doc(userId)
    .collection('studyLogs')
    .withConverter(studyLogModelConverter)

export const getStudyLog = async ({
  userId,
  id,
}: {
  userId: string
  id: string
}): Promise<StudyLogModelMapper | null> => {
  const snapshot = await getStudyLogCollection(userId).doc(id).get()
  const studyLog = snapshot.data()
  if (!studyLog) {
    return null
  }
  return {
    ...studyLog,
    id: snapshot.id,
    userId: snapshot.ref.parent.parent?.id,
  }
}

export const listStudyLogs = async (
  userId: string,
): Promise<StudyLogModelMapper[]> => {
  const snapshot = await getStudyLogCollection(userId).get()
  return snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
    userId: doc.ref.parent.parent?.id,
  }))
}

export const createStudyLog = async (
  userId: string,
  obj: {
    studyTime: number
    studyContent: string
  },
): Promise<StudyLogModelMapper> => {
  const ref = await getStudyLogCollection(userId).add({
    ...obj,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  })
  const studyLog = await getStudyLog({ id: ref.id, userId: userId })
  if (!studyLog) {
    throw new Error('StudyLog not created')
  }
  return studyLog
}

export const updateStudyLog = async (
  userId: string,
  id: string,
  obj: { studyTime?: number; studyContent?: string },
): Promise<StudyLogModelMapper> => {
  const ref = getStudyLogCollection(userId).doc(id)
  await ref.update({ ...obj, updatedAt: FieldValue.serverTimestamp() })
  const studyLog = await getStudyLog({ id: ref.id, userId: userId })
  if (!studyLog) {
    throw new Error('StudyLog not updated')
  }
  return studyLog
}

export const deleteStudyLog = async (
  id: string,
  userId: string,
): Promise<StudyLogModelMapper> => {
  const studyLog = await getStudyLog({ id: id, userId: userId })
  if (!studyLog) {
    throw new Error('StudyLog not found')
  }
  await getStudyLogCollection(userId).doc(id).delete()
  return studyLog
}