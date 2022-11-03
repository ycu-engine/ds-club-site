import type { CollectionReference, Query } from 'firebase-admin/firestore'
import { FieldValue } from 'firebase-admin/firestore'
import { firestore } from '../../clients/firebase'
import type { TrialUserModel } from './models'
import { trialUserModelConverter } from './models'
import type { TrialUserModelMapper } from './types'

const trialUserCollection = firestore
  .collection('trialUsers')
  .withConverter(trialUserModelConverter)

export const getTrialUser = async (
  userId: string,
): Promise<TrialUserModelMapper | null> => {
  const snapshot = await trialUserCollection.doc(userId).get()
  const trialUser = snapshot.data()
  if (!trialUser) {
    return null
  }
  return { ...trialUser, id: snapshot.id }
}

export const listTrialUsers = async (
  query: (
    collection: CollectionReference<TrialUserModel>,
  ) => Query<TrialUserModel> = (collection) => collection,
): Promise<TrialUserModelMapper[]> => {
  const snapshot = await query(trialUserCollection).get()
  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}

export const createTrialUser = async (obj: {
  name: string
  email: string
}): Promise<TrialUserModelMapper> => {
  const ref = await trialUserCollection.add({
    ...obj,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  })
  const trialUser = await getTrialUser(ref.id)
  if (!trialUser) {
    throw new Error('TrialUser not created')
  }
  return trialUser
}

export const removeTrialUser = async (
  userId: string,
): Promise<TrialUserModelMapper | null> => {
  const trialUser = await getTrialUser(userId)
  if (!trialUser) {
    return null
  }
  await trialUserCollection.doc(userId).delete()
  return trialUser
}
