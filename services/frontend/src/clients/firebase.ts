import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'

export const firebase = initializeApp({})

export const auth = getAuth(firebase)
connectAuthEmulator(auth, 'http://localhost:9099')
