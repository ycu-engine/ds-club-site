import type { ContextFunction } from 'apollo-server-core'
import type { ExpressContext } from 'apollo-server-express'
import type { RegularUser } from './generates/graphql'
import { verifyToken } from './modules/auth'
import { getUser } from './modules/user'

export interface Context {
  user: RegularUser | null
}

export const createContext: ContextFunction<ExpressContext, Context> = async ({
  req,
}) => {
  const authorization = req.headers.authorization
  if (!authorization) {
    return { user: null }
  }
  const [type, token] = authorization.split(' ')
  if (type?.toLowerCase() !== 'bearer' || !token) {
    return { user: null }
  }
  const decodedToken = await verifyToken(token)
  if (!decodedToken) {
    return { user: null }
  }
  try {
    const user = await getUser(decodedToken.uid)
    return { user }
  } catch {
    return { user: null }
  }
}
