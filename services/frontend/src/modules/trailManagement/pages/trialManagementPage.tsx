import { Container, Heading, useToast } from '@chakra-ui/react'
import { filter } from 'graphql-anywhere'
import { Loading } from '../../../components/Layout/Loading'
import {
  TrialManagementTableFragment,
  TrialManagementTableFragmentDoc,
  useTrialManagementPageQuery,
} from '../../../generates/graphql'
import { TrialManagementTable } from '../components/TrialManagementTable'

export const TrialManagementPage = () => {
  const toast = useToast()
  const { data, loading, error } = useTrialManagementPageQuery({})

  if (loading) {
    return <Loading loadingText="データ取得中..." />
  }

  if (error) {
    toast({
      description: error.message,
      duration: 5000,
      isClosable: true,
      status: 'error',
      title: 'エラー',
    })
    return (
      <Loading loadingText="データの取得に失敗しました。再度お試しください" />
    )
  }

  if (!data) {
    return <Loading loadingText="データがありません" />
  }

  const { getTrialUsers: trialUsers } = data

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
