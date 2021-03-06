import type { User } from './modules/user/models'
import type { ContextFunction } from 'apollo-server-core'
import type { ExpressContext } from 'apollo-server-express'
import { verifyToken } from './modules/auth'
import { getUser } from './modules/user'

export interface Context {
  user: User | null
}

export const createContext: ContextFunction<ExpressContext, Context> = async ({
  req,
}) => {
  const token = req.headers.authorization || ''
  if (!token) {
    return { user: null }
  }
  const decodedToken = await verifyToken(token)
  const user = await getUser(decodedToken.uid)
  return { user }
}
