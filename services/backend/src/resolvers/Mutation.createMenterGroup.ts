import type { MutationResolvers } from '../generates/graphql'
import { getRegularUser, updateRegularUser } from '../modules/regularUser'
import { getTrialUser, updateTrialUser } from '../modules/trialUser'
import { checkAdmin } from '../utils/checkAdmin'

export const createMenterGroupResolver: MutationResolvers['createMenterGroup'] =
  async (_root, { input: { menterId, menteeIds } }, { user }) => {
    checkAdmin(user)
    if (!menteeIds.length) {
      throw new Error('メンティーを選択してください')
    }
    try {
      const menter = await getRegularUser(menterId)
      const mentees = await Promise.all(
        menteeIds.map(async (menteeId) => {
          const mentee =
            (await getRegularUser(menteeId)) || (await getTrialUser(menteeId))
          return mentee
        }),
      )
      if (!menter) {
        throw new Error('メンターが見つかりません')
      }
      if (mentees.length !== menteeIds.length) {
        throw new Error('メンティーが見つかりません')
      }
      await updateRegularUser(menterId, { menterId: null })
      await Promise.all(
        menteeIds.map(async (menteeId) => {
          try {
            await updateRegularUser(menteeId, { menterId })
          } catch (error) {
            await updateTrialUser(menteeId, { menterId })
          }
        }),
      )
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
