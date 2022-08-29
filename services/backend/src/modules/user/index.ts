import { firestore } from '../../clients/firebase'
import { FieldValue } from 'firebase-admin/firestore'
import { userModelConverter } from './models'
import type {
  PaymentStatus,
  RankKind,
  RegularUser,
  UserRole,
} from '../../generates/graphql'

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

export const createUser = async (obj: {
  name: string
  currentRank: RankKind
  paymentStatus: PaymentStatus
  roles: UserRole[]
}): Promise<RegularUser> => {
  const ref = await userCollection.add({
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
    currentRank: RankKind
    paymentStatus: PaymentStatus
    roles: UserRole[]
  },
): Promise<RegularUser> => {
  const ref = userCollection.doc(id)
  await ref.set({
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
  obj: { name?: string; currentRank?: RankKind; paymentStatus?: PaymentStatus },
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
