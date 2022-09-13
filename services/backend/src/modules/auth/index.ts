import { auth } from '../../clients/firebase'

export const verifyToken = async (token: string) => {
  try {
    const decodedToken = await auth.verifyIdToken(token, true)
    return decodedToken
  } catch (error) {
    console.error(error)
    return null
  }
}
