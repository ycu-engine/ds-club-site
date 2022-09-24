import { firestore } from '../../clients/firebase'
import { FieldValue } from 'firebase-admin/firestore'
import { userModelConverter } from './models'
import type { RegularUser } from '../../generates/graphql'
import { PaymentStatus, RankKind, UserRole } from '../../generates/graphql'

const userCollection = firestore
  .collection('users')
  .withConverter(userModelConverter)

export const getUser = async (id: string): Promise<RegularUser | null> => {
  const snapshot = await userCollection.doc(id).get()
  const user = snapshot.data()
  if (!user) {
    return null
  }
  return { ...user, id: snapshot.id }
}

export const listUsers = async (): Promise<RegularUser[]> => {
  const snapshot = await userCollection.get()
  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}

const defaultRequiredFields = {
  currentRank: RankKind.Beginner,
  paymentStatus: PaymentStatus.NotPaid,
  roles: [UserRole.Staff],
}

export const createUser = async (obj: {
  name: string
  email: string
}): Promise<RegularUser> => {
  const ref = await userCollection.add({
    ...obj,
    ...defaultRequiredFields,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  })
  const user = await getUser(ref.id)
  if (!user) {
    throw new Error('RegularUser not created')
  }
  return user
}

export const createUserWithId = async (
  id: string,
  obj: {
    name: string
    email: string
  },
): Promise<RegularUser> => {
  const ref = userCollection.doc(id)
  await ref.set({
    ...obj,
    ...defaultRequiredFields,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  })
  const user = await getUser(ref.id)
  if (!user) {
    throw new Error('RegularUser not created')
  }
  return user
}

export const updateUser = async (
  id: string,
  obj: {
    name?: string
    currentRank?: RankKind
    paymentStatus?: PaymentStatus
    roles?: UserRole[]
    menterId?: string | null
  },
): Promise<RegularUser> => {
  const ref = userCollection.doc(id)
  await ref.update({ ...obj, updatedAt: FieldValue.serverTimestamp() })
  const user = await getUser(ref.id)
  if (!user) {
    throw new Error('RegularUser not created')
  }
  return user
}

export const deleteUser = async (id: string): Promise<RegularUser> => {
  const user = await getUser(id)
  if (!user) {
    throw new Error('RegularUser not found')
  }
  await userCollection.doc(id).delete()
  return user
}

export const addMenter = async (
  userId: string,
  menterId: string,
): Promise<RegularUser> => {
  if (userId === menterId) {
    throw new Error('User cannot be their own menter')
  }
  const user = await getUser(userId)
  if (!user) {
    throw new Error('User not found')
  }
  if (user.menterId) {
    throw new Error('User already has a menter')
  }
  const menter = await getUser(menterId)
  if (!menter) {
    throw new Error('Menter not found')
  }
  return await updateUser(userId, { menterId: menterId })
}

export const removeMenter = async (userId: string): Promise<RegularUser> => {
  const user = await getUser(userId)
  if (!user) {
    throw new Error('User not found')
  }
  return await updateUser(userId, { menterId: null })
}

export const replaceMenter = async (
  userId: string,
  menterId: string,
): Promise<RegularUser> => {
  if (userId === menterId) {
    throw new Error('User cannot be their own menter')
  }
  const user = await getUser(userId)
  if (!user) {
    throw new Error('User not found')
  }
  const menter = await getUser(menterId)
  if (!menter) {
    throw new Error('Menter not found')
  }
  return await updateUser(userId, { menterId: menterId })
}
