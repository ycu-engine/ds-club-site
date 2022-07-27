import type { QueryResolvers } from '../generates/graphql'
import { listUsers } from '../modules/user'

export const getRegularUsersResolver: NonNullable<
  QueryResolvers['getRegularUsers']
> = async () => {
  const users = await listUsers()
  // 実際はDBから取得するが、仮で値を返す
  return users
}
