import { verifyToken } from './modules/auth'
import { getRegularUser } from './modules/regularUser'
import type { UserModelMapper } from './modules/regularUser/types'
import type { TrialUserModelMapper } from './modules/trialUser/types'
import { getTrialUser } from './modules/trialUser'
import type { ContextFunction } from '@apollo/server'
import type { StandaloneServerContextFunctionArgument } from '@apollo/server/standalone'
export interface Context {
  user: UserModelMapper | TrialUserModelMapper | null
}

export const createContext: ContextFunction<
  [StandaloneServerContextFunctionArgument],
  Context
> = async ({ req }) => {
  const authorization = req.headers.authorization
  if (!authorization) {
    return { user: await getRegularUser('Vl25tBuup7Af38GD2Qx4cOj8g1MB') }
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
