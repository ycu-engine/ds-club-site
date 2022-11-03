import { Flex } from '@chakra-ui/react'
import { DefaultLayout } from '../../../components/Layout/DefaultLayout'

import { PrivilegeTable } from './components/PrivilegeTable'

export const Privilege = () => {
  return (
    <DefaultLayout>
      <Flex justifyContent="center">
        <PrivilegeTable />
      </Flex>
    </DefaultLayout>
  )
}
