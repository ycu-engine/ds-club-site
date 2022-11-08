import type { QueryResolvers } from '../generates/graphql'
import { getTrialUser } from '../modules/trialUser'
import { getRegularUser } from '../modules/regularUser'

export const getUserResolver: NonNullable<QueryResolvers['getUser']> = async (
  _root,
  { id },
) => {
  try {
    const regularUser = await getRegularUser(id)
    if (regularUser) {
      return regularUser
    }

    const trialUser = await getTrialUser(id)
    if (trialUser) {
      return trialUser
    }

    throw new Error('ユーザーが見つかりませんでした')
  } catch (error) {
    console.error(error)
    throw new Error('ユーザーの取得に失敗しました')
  }
}
