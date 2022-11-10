import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../clients/firebase'
import { Loading } from '../../../components/Layout/Loading'
import { useAdminOnlyQuery, UserRole } from '../../../generates/graphql'

const Denied = () => {
  const router = useRouter()
  const returnBack = useCallback(() => {
    setTimeout(() => {
      router.back()
    }, 3000)
  }, [router])

  useEffect(() => {
    void returnBack()
  }, [returnBack])
  return <Loading loadingText="権限がありませんでした。リダイレクトします…" />
}

type AdminOnlyProps = {
  children: React.ReactNode
  mode?: 'admin' | 'staff' | 'both'
}

/**
 * 管理者のみがアクセスできるページを作成するためのラッパー
 * @param children
 * @param mode `admin`: Adminのみ `staff`: Staffのみ `both`(default): AdminもしくはStaff
 */
export const AdminOnly = ({ children, mode = 'both' }: AdminOnlyProps) => {
  const toast = useToast()

  const [user, authLoading] = useAuthState(auth)
  const {
    data,
    loading: userLoading,
    error,
  } = useAdminOnlyQuery({
    variables: {
      userId: user?.uid ?? '',
    },
  })
  if (authLoading) {
    return <Loading loadingText="ログイン状態を確認中..." />
  }
  if (userLoading) {
    return <Loading loadingText="管理者権限を確認中..." />
  }
  if (error) {
    toast({
      description: error.message,
      duration: 5000,
      isClosable: true,
      status: 'error',
      title: 'エラー',
    })
    return <Loading loadingText="エラーが発生しました。" />
  }
  switch (mode) {
    case 'admin':
      if (data?.getUser?.roles.includes(UserRole.Admin)) {
        return <>{children}</>
      }
      break
    case 'staff':
      if (data?.getUser?.roles.includes(UserRole.Staff)) {
        return <>{children}</>
      }
      break
    case 'both':
      if (
        data?.getUser?.roles.includes(UserRole.Admin) ||
        data?.getUser?.roles.includes(UserRole.Staff)
      ) {
        return <>{children}</>
      }
      break

    default:
      break
  }
  return <Denied />
}
