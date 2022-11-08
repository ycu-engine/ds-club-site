import type { ExpressContext } from 'apollo-server-express'
import type { ContextFunction } from 'apollo-server-core'
import { verifyToken } from './modules/auth'
import { getRegularUser } from './modules/regularUser'
import type { UserModelMapper } from './modules/regularUser/types'
import type { TrialUserModelMapper } from './modules/trialUser/types'
import { getTrialUser } from './modules/trialUser'

export interface Context {
  user: UserModelMapper | TrialUserModelMapper | null
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
    const regularUser = await getRegularUser(decodedToken.uid)
    if (regularUser) {
      return { user: regularUser }
    }
    const trialUser = await getTrialUser(decodedToken.uid)
    if (trialUser) {
      return { user: trialUser }
    }
    return { user: null }
  } catch {
    return { user: null }
  }
}
