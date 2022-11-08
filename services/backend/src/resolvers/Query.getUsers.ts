import type { QueryResolvers } from '../generates/graphql'
import { listTrialUsers } from '../modules/trialUser'
import { listUsers } from '../modules/user'

export const getUsersResolver: NonNullable<QueryResolvers['getUsers']> = async (
  _root,
) => {
  try {
    const trialUsers = await listTrialUsers()
    const users = await listUsers()
    console.info(trialUsers)

    return [...trialUsers, ...users]
  } catch (error) {
    console.error(error)
    throw new Error('ユーザーの取得に失敗しました')
  }
}
