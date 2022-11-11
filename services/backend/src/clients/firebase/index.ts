import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'
import { getAuth } from 'firebase-admin/auth'

const app = initializeApp()

let firestore: ReturnType<typeof getFirestore>
let storage: ReturnType<typeof getStorage>
let auth: ReturnType<typeof getAuth>
try {
  firestore = getFirestore(app)
  storage = getStorage(app)
  auth = getAuth(app)
} catch (error) {
  console.error(error)
}

export { firestore, storage, auth }
