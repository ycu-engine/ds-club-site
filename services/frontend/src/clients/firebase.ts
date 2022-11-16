import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'

export const firebase = initializeApp(
  process.env.NODE_ENV === 'development'
    ? {
        apiKey: 'test',
        appId: 'test',
        projectId: 'test',
      }
    : {
        apiKey: 'AIzaSyA_A4NeUdRD5OLGiEbmrqAAVjsc_hYwsJI',
        appId: '1:1057607200874:web:aa75a6a3e116941b749a13',
        authDomain: 'ds-club-site.firebaseapp.com',
        measurementId: 'G-SLTD1BG6KE',
        messagingSenderId: '1057607200874',
        projectId: 'ds-club-site',
        storageBucket: 'ds-club-site.appspot.com',
      },
)

export const auth = getAuth(firebase)
if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099')
}
