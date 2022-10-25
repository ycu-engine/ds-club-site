import { Container, Heading } from '@chakra-ui/react'
import { filter } from 'graphql-anywhere'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../clients/firebase'
import { Loading } from '../../../components/Loading'
import {
  TrialManagementTableFragment,
  TrialManagementTableFragmentDoc,
  UserRole,
  useTrialManagementPageQuery,
} from '../../../generates/graphql'
import { TrialManagementTable } from '../components/TrialManagementTable'

export const TrialManagementPage = () => {
  const [user, authLoading] = useAuthState(auth)
  const { data, loading: queryLoading } = useTrialManagementPageQuery({
    skip: !user || authLoading,
    variables: { userId: user?.uid || '' },
  })

  if (authLoading || queryLoading) {
    return <Loading />
  }

  if (!data) {
    return <Heading>データの取得に失敗しました</Heading>
  }

  const { getUser: loginUser, getTrialUsers: trialUsers } = data
  console.info(loginUser)
  console.info(trialUsers)

  const { roles } = loginUser
  if (!roles.includes(UserRole.Admin) && !roles.includes(UserRole.Staff)) {
    return <Heading>権限がありません</Heading>
  }

  return (
    <>
      <Heading p="5">体験入会管理ページ</Heading>

      <Container maxW="container.xl">
        <TrialManagementTable
          trialUsers={filter<TrialManagementTableFragment[]>(
            TrialManagementTableFragmentDoc,
            trialUsers,
          )}
        />
      </Container>
    </>
  )
}
