import { Box, Text, Center, Flex, Select } from '@chakra-ui/react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { DefaultLayout } from '../components/DefaultLayout'
import { useState, useCallback, ChangeEventHandler } from 'react'

const Page = () => {
  const [selectedPerson, setSelectedPerson] = useState<string>()
  const handleOnChangeSelect = useCallback<
    ChangeEventHandler<HTMLSelectElement>
  >((e) => {
    setSelectedPerson(e.target.value)
  }, [])
  return (
    <DefaultLayout>
      <Box px={10} pt={5}>
        <Flex direction="column" h={100} w={400} justify="center">
          <Flex>
            <Text fontSize="4xl">選択した人物</Text>
          </Flex>

          <Select
            placeholder="選択画面"
            mt={3}
            background={'#FFFFFE'}
            value={selectedPerson}
            onChange={handleOnChangeSelect}
          >
            <option value="諸田健太朗">諸田健太朗</option>
            <option value="佐藤駿">佐藤駿</option>
            <option value="川島一翔">川島一翔</option>
          </Select>
        </Flex>

        <Flex justifyContent={'center'} mt={16}>
          <TableContainer>
            <Table background={'#FFFFFE'}>
              <Tbody>
                <Tr>
                  <Td>ユーザー名</Td>
                  <Td>{selectedPerson}</Td>
                </Tr>
                <Tr>
                  <Td>段位</Td>
                  <Td>
                    <Select>
                      <option value="begginer">ビギナー</option>
                      <option value="evangelist">エヴァンジェリスト</option>
                      <option value="master">マスター</option>
                      <option value="imperator">インペラトル</option>
                    </Select>
                  </Td>
                </Tr>
                <Tr>
                  <Td>称号</Td>
                  <Td>
                    <Select>
                      <option value="ds">DS</option>
                      <option value="stats">統計</option>
                      <option value="coding">コーディング</option>
                    </Select>
                  </Td>
                </Tr>
                <Tr>
                  <Td>支払い状況</Td>
                  <Td>
                    <Select>
                      <option value="done">完了</option>
                      <option value="yet">未完了</option>
                    </Select>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Box>
    </DefaultLayout>
  )
}

export default Page
