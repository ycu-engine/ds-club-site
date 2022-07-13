import { firestore } from '../../clients/firebase'
import { FieldValue } from 'firebase-admin/firestore'
import { UserModel } from './models'

const userCollection = firestore.collection('users')

export const getUser = async (id: string) => {
  const snapshot = await userCollection.doc(id).get()
  if (!snapshot.exists) {
    return null
  }
  return UserModel.parse({ ...snapshot.data(), id: snapshot.id })
}

export const createUser = async (obj: { name: string }) => {
  const ref = await userCollection.add({
    ...obj,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  })
  const user = await getUser(ref.id)
  if (!user) {
    throw new Error('User not created')
  }
  return user
}

export const updateUser = async (id: string, obj: { name?: string }) => {
  const ref = userCollection.doc(id)
  await ref.update({ ...obj, updatedAt: FieldValue.serverTimestamp() })
  const user = await getUser(ref.id)
  if (!user) {
    throw new Error('User not created')
  }
  return user
}

export const deleteUser = async (id: string) => {
  const user = await getUser(id)
  if (!user) {
    throw new Error('User not found')
  }
  await userCollection.doc(id).delete()
  return user
}
