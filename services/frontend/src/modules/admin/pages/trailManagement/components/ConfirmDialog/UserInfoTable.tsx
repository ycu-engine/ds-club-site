import {
  TableContainer,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react'
import type { TrialManagementTableFragment } from '../../../../../../generates/graphql'

type UserInfoTableProps = {
  trialUser: TrialManagementTableFragment | null
  caption: string
}
export const UserInfoTable = ({ trialUser, caption }: UserInfoTableProps) => {
  return (
    <TableContainer>
      <Table>
        <Tbody>
          <Tr>
            <Th>名前</Th>

            <Td>{trialUser?.name}</Td>
          </Tr>

          <Tr>
            <Th>体験入会開始日</Th>

            <Td>{trialUser?.createdAt}</Td>
          </Tr>

          <Tr>
            <Th>体験入会終了日</Th>

            <Td>{trialUser?.expiredAt}</Td>
          </Tr>
        </Tbody>

        <TableCaption>{caption}</TableCaption>
      </Table>
    </TableContainer>
  )
}
