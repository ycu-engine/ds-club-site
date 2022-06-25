import {
  Wrap,
  Box,
  Text,
  VStack,
  StackDivider,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import React from 'react'
import { DefaultLayout } from '../components/DefaultLayout'
import { useState } from 'react'

type User = {
  id: number // 会員ごとに一意なid
  name: string //　名前
  isPaid: string // 支払い
  rank: string // 段位
}
// テスト用のユーザー
const users: User[] = [
  { id: 1, name: '浦 優太', isPaid: '済', rank: 'Ip' },
  { id: 2, name: '佐藤 駿', isPaid: '未', rank: 'Ms' },
  { id: 3, name: '諸田 健太郎', isPaid: '済', rank: 'Ms' },
  { id: 4, name: 'Aさん', isPaid: '未', rank: 'Bg' },
  { id: 5, name: 'Bさん', isPaid: '未', rank: 'Ev' },
  { id: 6, name: 'Cさん', isPaid: '未', rank: 'Bg' },
  { id: 7, name: 'Dさん', isPaid: '未', rank: 'Bg' },
  { id: 8, name: '中村拓実', isPaid: '済', rank: 'Ip' },
]

function Page() {
  // ユーザーのHooks
  const [userInfos, setUserInfos] = useState<User[]>(users)

  //   支払い状況の変更
  const handleChangeIsPaid = (event) => {
    setUserInfos((userInfos) => {
      return userInfos.map((userInfo) => {
        // 変更する人を見つける
        if (event.target.name === String(userInfo.id)) {
          return { ...userInfo, isPaid: event.target.value }
        }
        return userInfo
      })
    })
  }

  //   段位の変更
  const handleChangeRank = (event) => {
    setUserInfos((userInfos) => {
      return userInfos.map((userInfo) => {
        // 変更する人を見つける
        if (event.target.name === String(userInfo.id)) {
          return { ...userInfo, rank: event.target.value }
        }
        return userInfo
      })
    })
  }

  //   ランクに応じて色を変える
  const rankColor = (rank: string) => {
    switch (rank) {
      case 'Ip':
        return 'orange.100'
      case 'Ms':
        return 'purple.100'
      case 'Ev':
        return 'green.100'
      case 'Bg':
        return 'blue.100'
    }
  }

  //   JSXElement
  return (
    <DefaultLayout>
      <Wrap justify="center" py="10" spacingX="20" spacingY="10">
        {/* 会費支払い状況 */}
        <Box textAlign="center" p="10" w={{ base: '90%', lg: '40%' }}>
          <Text fontSize={['xl', '3xl']}>会費支払い状況</Text>
          <VStack
            divider={<StackDivider borderColor="blackAlpha.700" />}
            bg="white"
            border="1px solid black"
            borderRadius="sm"
            p="3"
          >
            {/* 名前とボタン */}
            {userInfos.map((user) => {
              return (
                <Flex
                  w="60%"
                  alignItems="center"
                  justifyContent="space-between"
                  key={user.id}
                >
                  <Text>{user.name}</Text>
                  <Menu>
                    <MenuButton
                      p="3"
                      fontSize="sm"
                      fontWeight="bold"
                      borderRadius="full"
                      bg={user.isPaid === '済' ? 'teal.100' : 'red.100'}
                      _hover={{ boxShadow: 'outline' }}
                    >
                      {user.isPaid}
                    </MenuButton>
                    {/* 支払い状況のリスト */}
                    <MenuList>
                      {/* クリックしたら状態を変更する */}
                      <MenuItem
                        value="済"
                        name={String(user.id)}
                        onClick={handleChangeIsPaid}
                      >
                        済
                      </MenuItem>
                      <MenuItem
                        value="未"
                        name={String(user.id)}
                        onClick={handleChangeIsPaid}
                      >
                        未
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              )
            })}
          </VStack>
        </Box>

        {/* 段位状況 */}
        <Box textAlign="center" p="10" w={{ base: '90%', lg: '40%' }}>
          <Text fontSize={['xl', '3xl']}>段位状況</Text>
          <VStack
            divider={<StackDivider borderColor="blackAlpha.700" />}
            bg="white"
            border="1px solid black"
            borderRadius="sm"
            p="3"
          >
            {userInfos.map((user) => {
              return (
                <Flex
                  w="60%"
                  alignItems="center"
                  justifyContent="space-between"
                  key={user.id}
                >
                  {/* 名前とボタン */}
                  <Text>{user.name}</Text>
                  <Menu>
                    <MenuButton
                      p="3"
                      fontSize="sm"
                      fontWeight="bold"
                      borderRadius="full"
                      bg={rankColor(user.rank)}
                      _hover={{ boxShadow: 'outline' }}
                    >
                      {user.rank}
                    </MenuButton>
                    {/* 段位のリスト */}
                    <MenuList>
                      {/* クリックしたら段位を変更する */}
                      <MenuItem
                        value="Ip"
                        name={String(user.id)}
                        onClick={handleChangeRank}
                      >
                        Intrapel(イントラペル)
                      </MenuItem>
                      <MenuItem
                        value="Ms"
                        name={String(user.id)}
                        onClick={handleChangeRank}
                      >
                        Master(マスター)
                      </MenuItem>
                      <MenuItem
                        value="Ev"
                        name={String(user.id)}
                        onClick={handleChangeRank}
                      >
                        Evangelist(エヴァンジェリスト)
                      </MenuItem>
                      <MenuItem
                        value="Bg"
                        name={String(user.id)}
                        onClick={handleChangeRank}
                      >
                        Beginner(ビギナー)
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              )
            })}
          </VStack>
        </Box>
      </Wrap>
    </DefaultLayout>
  )
}

export default Page
