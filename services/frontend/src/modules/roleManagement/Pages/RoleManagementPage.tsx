import { Flex } from '@chakra-ui/react'
import { DefaultLayout } from '../../../components/Layout/DefaultLayout'

import { RoleTable } from '../components/RoleTable'

export const RoleManagementPage = () => {
  return (
    <DefaultLayout>
      <Flex justifyContent="center">
        <RoleTable />
      </Flex>
    </DefaultLayout>
  )
}
