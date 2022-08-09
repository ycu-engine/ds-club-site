import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'

export const firebase = initializeApp({
  projectId: 'test',
  appId: 'test',
  apiKey: 'test',
})

export const auth = getAuth(firebase)
connectAuthEmulator(auth, 'http://localhost:9099')
