import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import {
  RoleTableTrFragment,
  useRoleMangementPageQuery,
  useRoleMangementPage_AddUserRoleMutation,
  useRoleMangementPage_RemoveUserRoleMutation,
} from '../../../generates/graphql'
import { RoleTableTr } from './RoleTableTr'

export const RoleTable = () => {
  const [addUserRole] = useRoleMangementPage_AddUserRoleMutation({
    optimisticResponse({ userId, role }) {
      return {
        __typename: 'Mutation',
        updateUserRole: {
          id: { userId },
          role: { role },
        },
      }
    },
  })

  const [removeUserRole] = useRoleMangementPage_RemoveUserRoleMutation({
    optimisticResponse({ userId, role }) {
      return {
        __typename: 'Mutation',
        updateUserRole: {
          id: { userId },
          role: { role },
        },
      }
    },
  })

  const { data, loading, error } = useRoleMangementPageQuery({
    variables: {},
  })
  if (loading) {
    return <>loading</>
  }
  if (error) {
    console.error(error)
    return <>error</>
  }
  if (!data) {
    return <>loading</>
  }
  console.debug(data)

  return (
    <TableContainer>
      <Table>
        <Thead bgColor="gray">
          <Tr>
            <Th
              borderColor="black"
              borderWidth="2px"
              color="white"
              fontSize="18px"
            >
              名前
            </Th>

            <Th
              borderColor="black"
              borderWidth="2px"
              color="white"
              fontSize="20px"
            >
              権限
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {data.getRegularUsers.map((user: RoleTableTrFragment) => {
            return (
              <RoleTableTr
                addUserRole={addUserRole}
                id={user.id}
                key={user.id}
                name={user.name}
                removeUserRole={removeUserRole}
                roles={user.roles}
              />
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
