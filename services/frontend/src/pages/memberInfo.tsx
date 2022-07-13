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
import React, { useState } from 'react'
import { DefaultLayout } from '../components/DefaultLayout'

type User = {
  id: number // 会員ごとに一意なid
  name: string //　名前
  isPaid: string // 支払い
  rank: string // 段位
}

// テスト用のユーザー
const users: User[] = [
  { id: 1, isPaid: '済', name: '浦 優太', rank: 'Ip' },
  { id: 2, isPaid: '未', name: '佐藤 駿', rank: 'Ms' },
  { id: 3, isPaid: '済', name: '諸田 健太郎', rank: 'Ms' },
  { id: 4, isPaid: '未', name: 'Aさん', rank: 'Bg' },
  { id: 5, isPaid: '未', name: 'Bさん', rank: 'Ev' },
  { id: 6, isPaid: '未', name: 'Cさん', rank: 'Bg' },
  { id: 7, isPaid: '未', name: 'Dさん', rank: 'Bg' },
  { id: 8, isPaid: '済', name: '中村拓実', rank: 'Ip' },
]

const Page = () => {
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

        <Box p="10" textAlign="center" w={{ base: '90%', lg: '40%' }}>
          <Text fontSize={['xl', '3xl']}>会費支払い状況</Text>

          <VStack
            bg="white"
            border="1px solid black"
            borderRadius="sm"
            divider={<StackDivider borderColor="blackAlpha.700" />}
            p="3"
          >
            {/* 名前とボタン */}

            {userInfos.map((user) => {
              return (
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  key={user.id}
                  w="60%"
                >
                  <Text>{user.name}</Text>

                  <Menu>
                    <MenuButton
                      _hover={{ boxShadow: 'outline' }}
                      bg={user.isPaid === '済' ? 'teal.100' : 'red.100'}
                      borderRadius="full"
                      fontSize="sm"
                      fontWeight="bold"
                      p="3"
                    >
                      {user.isPaid}
                    </MenuButton>

                    {/* 支払い状況のリスト */}

                    <MenuList>
                      {/* クリックしたら状態を変更する */}

                      <MenuItem
                        name={String(user.id)}
                        onClick={handleChangeIsPaid}
                        value="済"
                      >
                        済
                      </MenuItem>

                      <MenuItem
                        name={String(user.id)}
                        onClick={handleChangeIsPaid}
                        value="未"
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

        <Box p="10" textAlign="center" w={{ base: '90%', lg: '40%' }}>
          <Text fontSize={['xl', '3xl']}>段位状況</Text>

          <VStack
            bg="white"
            border="1px solid black"
            borderRadius="sm"
            divider={<StackDivider borderColor="blackAlpha.700" />}
            p="3"
          >
            {userInfos.map((user) => {
              return (
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  key={user.id}
                  w="60%"
                >
                  {/* 名前とボタン */}

                  <Text>{user.name}</Text>

                  <Menu>
                    <MenuButton
                      _hover={{ boxShadow: 'outline' }}
                      bg={rankColor(user.rank)}
                      borderRadius="full"
                      fontSize="sm"
                      fontWeight="bold"
                      p="3"
                    >
                      {user.rank}
                    </MenuButton>

                    {/* 段位のリスト */}

                    <MenuList>
                      {/* クリックしたら段位を変更する */}

                      <MenuItem
                        name={String(user.id)}
                        onClick={handleChangeRank}
                        value="Ip"
                      >
                        Intrapel(イントラペル)
                      </MenuItem>

                      <MenuItem
                        name={String(user.id)}
                        onClick={handleChangeRank}
                        value="Ms"
                      >
                        Master(マスター)
                      </MenuItem>

                      <MenuItem
                        name={String(user.id)}
                        onClick={handleChangeRank}
                        value="Ev"
                      >
                        Evangelist(エヴァンジェリスト)
                      </MenuItem>

                      <MenuItem
                        name={String(user.id)}
                        onClick={handleChangeRank}
                        value="Bg"
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
