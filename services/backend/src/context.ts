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
  const authorization = req.get('authorization')
  if (!authorization) {
    console.log('test1---', req.rawHeaders)
    return { user: null }
  }
  const [type, token] = authorization.split(' ')
  if (type?.toLowerCase() !== 'bearer' || !token) {
    console.log('test2')
    return { user: null }
  }
  const decodedToken = await verifyToken(token)
  if (!decodedToken) {
    console.log('test3')
    return { user: null }
  }
  const user = await getUser(decodedToken.uid)
  return { user }
}
