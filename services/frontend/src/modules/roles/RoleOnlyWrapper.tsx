import { useRoleOnlyWrapperQuery, UserRole } from '../../generates/graphql'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../clients/firebase'

type RoleOnlyWrapperProps = {
  children: React.ReactNode
  roles: UserRole | UserRole[]
}
/**
 *
 * @param children 子要素
 * @param roles 閲覧権限のあるrole、またはroleの配列
 * @returns children or null
 */
export const RoleOnlyWrapper = ({ children, roles }: RoleOnlyWrapperProps) => {
  const [loginUser, authLoading] = useAuthState(auth)
  const { data, loading, error } = useRoleOnlyWrapperQuery({
    variables: {
      userId: loginUser?.uid ?? '',
    },
  })
  if (authLoading || loading || error) {
    return null
  }
  if (!data) {
    return null
  }
  const user = data.getUser
  const userRoles = user.roles

  if (Array.isArray(roles)) {
    // もしrolesのなかにuserのroleが含まれていたら表示する
    if (roles.some((role) => userRoles.includes(role))) {
      return <>{children}</>
    }
  } else if (userRoles.includes(roles)) {
    return <>{children}</>
  }

  return null
}
