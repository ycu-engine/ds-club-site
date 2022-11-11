import { auth } from 'clients/firebase'
import { Loading } from 'components/Layout/Loading'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { AdminOnlyLayout } from '../AdminOnlyLayout/AdminOnlyLayout'

type AdminOrLoginOnlyLayoutProps = {
  children: React.ReactNode
  userId: string
}
export const AdminOrLoginOnlyLayout = ({
  children,
  userId,
}: AdminOrLoginOnlyLayoutProps) => {
  const router = useRouter()
  const [user, authLoading] = useAuthState(auth)
  if (authLoading) {
    return <Loading loadingText="ログイン情報を取得中..." />
  }
  if (!user) {
    void router.push('/login')
    return <Loading loadingText="ログインしてください" />
  }
  if (user.uid === userId) {
    return children
  }
  // 本人でない場合は管理者かどうかを確認
  return <AdminOnlyLayout>{children}</AdminOnlyLayout>
}
