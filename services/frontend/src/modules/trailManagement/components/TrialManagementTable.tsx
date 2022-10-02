import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'

const sampleUsers = [
  {
    id: '1',
    name: '山田太郎',
    trialEndDate: '2021-01-31',
    trialStartDate: '2021-01-01',
  },
  {
    id: '2',
    name: '山田花子',
    trialEndDate: '2021-12-31',
    trialStartDate: '2021-12-01',
  },
]
const CanselButton = () => {
  return <Button colorScheme="orange">キャンセル</Button>
}
export const TrialManagementTable = () => {
  return (
    <TableContainer border="1px solid black" rounded="10">
      <Table variant="simple">
        <Thead bg="orange.200">
          <Tr>
            <Th>名前</Th>

            <Th>体験入会開始日</Th>

            <Th>体験入会終了日</Th>

            <Th>キャンセル</Th>
          </Tr>
        </Thead>

        <Tbody>
          {sampleUsers.map((user) => (
            <Tr key={user.id}>
              <Td>{user.name}</Td>

              <Td>{user.trialStartDate}</Td>

              <Td>{user.trialEndDate}</Td>

              <Td>
                <CanselButton />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
