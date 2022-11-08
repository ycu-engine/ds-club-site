import type { QueryResolvers } from '../generates/graphql'
import { listTrialUsers } from '../modules/trialUser'
import { listRegularUsers } from '../modules/regularUser'

export const getUsersResolver: NonNullable<QueryResolvers['getUsers']> = async (
  _root,
) => {
  try {
    const trialUsers = await listTrialUsers()
    const users = await listRegularUsers()

    return [...trialUsers, ...users]
  } catch (error) {
    console.error(error)
    throw new Error('ユーザーの取得に失敗しました')
  }
}
