import type { FirebaseError } from 'firebase-admin'
import { auth } from '../clients/firebase'
import type { MutationResolvers } from '../generates/graphql'
import { createTrialUserWithId } from '../modules/trialUser'

const messageTemplate = (name: string, email: string, affiliation: string) => `
体験入会の申請がありました。
名前: ${name}
メールアドレス: ${email}
所属: ${affiliation}
`
// 後に実装
const sendMail = (message: string) => {
  console.info(message)
}
export const submitTrialApplicationResolver: NonNullable<
  MutationResolvers['submitTrialApplication']
> = async (_root, { input }) => {
  if (input.password !== input.passwordConfirmation) {
    throw new Error('確認用パスワードが一致しません')
  }

  // ユーザー定義の型ガード
  const isFirebaseError = (error: unknown): error is FirebaseError =>
    error instanceof Error && 'code' in error

  try {
    const authUser = await auth.createUser({
      disabled: true,
      email: input.email,
      emailVerified: true,
      password: input.password, // 有効化されるまでログイン不可
    })

    const user = await createTrialUserWithId(authUser.uid, {
      email: input.email,
      name: input.name,
    })
    if (!user) {
      return false
    }
    sendMail(messageTemplate(input.name, input.email, input.affiliation))
    return true
  } catch (error) {
    if (isFirebaseError(error)) {
      if (error.code === 'auth/email-already-exists') {
        throw new Error('このメールアドレスは既に登録されています')
      }
      throw error
    }

    throw new Error('エラーが発生しました')
  }
}
