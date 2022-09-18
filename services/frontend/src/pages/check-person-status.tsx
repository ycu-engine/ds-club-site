import {
  Box,
  Text,
  Flex,
  Select,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { DefaultLayout } from '../components/DefaultLayout'
import type { ChangeEventHandler } from 'react'
import { useState, useCallback } from 'react'

const Page = () => {
  const [selectedPerson, setSelectedPerson] = useState<string>()
  const handleOnChangeSelect = useCallback<
    ChangeEventHandler<HTMLSelectElement>
  >((e) => {
    setSelectedPerson(e.target.value)
  }, [])
  return (
    <DefaultLayout>
      <Box pt={5} px={10}>
        <Flex direction="column" h={100} justify="center" w={400}>
          <Flex>
            <Text fontSize="4xl">選択した人物</Text>
          </Flex>

          <Select
            background="#FFFFFE"
            mt={3}
            onChange={handleOnChangeSelect}
            placeholder="選択画面"
            value={selectedPerson}
          >
            <option value="諸田健太朗">諸田健太朗</option>

            <option value="佐藤駿">佐藤駿</option>

            <option value="川島一翔">川島一翔</option>
          </Select>
        </Flex>

        <Flex justifyContent="center" mt={16}>
          <TableContainer>
            <Table background="#FFFFFE">
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
