import { auth } from '../../clients/firebase'

export const verifyToken = async (token: string) => {
  const decodedToken = await auth.verifyIdToken(token, true)
  return decodedToken
}
