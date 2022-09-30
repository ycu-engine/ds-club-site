import type { UserModel } from './models'

export type UserModelMapper = UserModel & {
  id: string
}
