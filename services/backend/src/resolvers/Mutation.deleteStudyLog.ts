import type { MutationResolvers } from '../generates/graphql'
import { deleteStudyLog, getStudyLog } from '../modules/studyLog'
import { checkAdmin } from '../utils/checkAdmin'

export const deleteStudyLogResolver: NonNullable<
  MutationResolvers['deleteStudyLog']
> = async (_, { id, userId }, { user }) => {
  // 本人もしくは管理者のみ削除可能
  if (userId !== user?.id) {
    checkAdmin(user)
  }
  try {
    const studyLog = await getStudyLog(id, userId)
    if (!studyLog) {
      throw new Error('該当の学習記録が見つかりません')
    }
    const deletedStudyLog = await deleteStudyLog(id, userId)
    return deletedStudyLog
  } catch (error) {
    console.error(error)
    throw new Error('学習記録の削除に失敗しました')
  }
}
