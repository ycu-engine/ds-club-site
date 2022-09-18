import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import { useState } from 'react'
import { CustomTr } from './CustomTr'

export const PrivilegeTable = () => {
  const [privilegeObj, setPrivilegeObj] = useState({
    中村拓実: ['STAFF', 'MENTER'],
    岡田拓也: ['STAFF'],
  })

  const add = (privilege: string) => {
    const privilegeList = privilegeObj.中村拓実
    privilegeList.push(privilege)
    setPrivilegeObj((obj) => ({
      ...obj,
      中村拓実: privilegeList,
    }))
  }

  const del = (privilege: string) => {
    const privilegeList = privilegeObj.中村拓実
    const index = privilegeList.indexOf(privilege)
    privilegeList.splice(index, 1)
    setPrivilegeObj((obj) => ({
      ...obj,
      中村拓実: privilegeList,
    }))
  }
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
          {Object.entries(privilegeObj).map((entry) => {
            return (
              <CustomTr
                add={add}
                del={del}
                key={entry[0]}
                name={entry[0]}
                privilege={entry[1]}
              />
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
