import { firestore } from '../../clients/firebase'
import type { CollectionReference, Query } from 'firebase-admin/firestore'
import { FieldValue } from 'firebase-admin/firestore'
import type { UserModel } from './models'
import { userModelConverter } from './models'
import { PaymentStatus, RankKind, UserRole } from '../../generates/graphql'
import type { UserModelMapper } from './types'

const userCollection = firestore
  .collection('users')
  .withConverter(userModelConverter)

export const getRegularUser = async (
  id: string,
): Promise<UserModelMapper | null> => {
  const snapshot = await userCollection.doc(id).get()
  const user = snapshot.data()
  if (!user) {
    return null
  }
  return { ...user, id: snapshot.id }
}

export const listRegularUsers = async (
  query: (collection: CollectionReference<UserModel>) => Query<UserModel> = (
    collection,
  ) => collection,
): Promise<UserModelMapper[]> => {
  const snapshot = await query(userCollection).get()
  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}

const defaultRequiredFields = {
  currentRank: RankKind.Beginner,
  paymentStatus: PaymentStatus.NotPaid,
  roles: [UserRole.Member],
}

export const createRegularUser = async (obj: {
  name: string
  email: string
}): Promise<UserModelMapper> => {
  const ref = await userCollection.add({
    ...defaultRequiredFields,
    ...obj,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  })
  const user = await getRegularUser(ref.id)
  if (!user) {
    throw new Error('RegularUser not created')
  }
  return user
}

export const createRegularUserWithId = async (
  id: string,
  obj: {
    name: string
    email: string
  },
): Promise<UserModelMapper> => {
  const ref = userCollection.doc(id)
  await ref.set({
    ...defaultRequiredFields,
    ...obj,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  })
  const user = await getRegularUser(ref.id)
  if (!user) {
    throw new Error('RegularUser not created')
  }
  return user
}

export const updateRegularUser = async (
  id: string,
  obj: {
    name?: string
    currentRank?: RankKind
    paymentStatus?: PaymentStatus
    roles?: UserRole[]
    menterId?: string | null
  },
): Promise<UserModelMapper> => {
  const ref = userCollection.doc(id)
  if (obj.menterId) {
    if (ref.id === obj.menterId) {
      throw new Error('User cannot be their own menter')
    }
  }
  await ref.update({ ...obj, updatedAt: FieldValue.serverTimestamp() })
  const user = await getRegularUser(ref.id)
  if (!user) {
    throw new Error('RegularUser not created')
  }
  return user
}

export const deleteRegularUser = async (
  id: string,
): Promise<UserModelMapper> => {
  const user = await getRegularUser(id)
  if (!user) {
    throw new Error('RegularUser not found')
  }
  await userCollection.doc(id).delete()
  return user
}
