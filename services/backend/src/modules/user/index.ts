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
    ...defaultRequiredFields,
    ...obj,
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
    ...defaultRequiredFields,
    ...obj,
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
  if (obj.menterId) {
    if (ref.id === obj.menterId) {
      throw new Error('User cannot be their own menter')
    }
  }
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
