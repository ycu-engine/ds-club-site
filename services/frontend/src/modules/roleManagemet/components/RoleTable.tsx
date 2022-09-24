import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import {
  useRoleMangementPageQuery,
  useRoleMangementPage_UpdateUserRolesMutation,
} from '../../../generates/graphql'
import { CustomTr } from './CustomTr'

export const RoleTable = () => {
  const [mutateUpdateRoles] = useRoleMangementPage_UpdateUserRolesMutation({
    optimisticResponse({ userId, roles }) {
      return {
        __typename: 'Mutation',
        updateUserRole: {
          id: { userId },
          roles: { roles },
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
          {data.getRegularUsers.map((entry) => {
            return (
              <CustomTr
                key={entry.id}
                name={entry.name}
                roles={entry.roles}
                updateRoles={mutateUpdateRoles}
                userId={entry.id}
              />
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
