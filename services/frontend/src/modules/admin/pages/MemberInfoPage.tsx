import {
  Wrap,
  VStack,
  Box,
  StackDivider,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useToast,
} from '@chakra-ui/react'
import { DefaultLayout } from '../../../components/DefaultLayout'
import {
  PaymentStatus,
  RankKind,
  useMemberInfoPageQuery,
  useMemberInfoPage_UpdateCurrentRankMutation,
  useMemberInfoPage_UpdatePaymentStatusMutation,
} from '../../../generates/graphql'

//   ランクに応じて色を変える
const RANK_COLOR: Record<RankKind, string> = {
  [RankKind.Imperator]: 'orange.100',
  [RankKind.Master]: 'purple.100',
  [RankKind.Evangelist]: 'green.100',
  [RankKind.Beginner]: 'blue.100',
}

export const MemberInfoPage = () => {
  const toast = useToast()
  const { data } = useMemberInfoPageQuery()
  const [mutateUpdatePaymentStatus] =
    useMemberInfoPage_UpdatePaymentStatusMutation({
      optimisticResponse({ paymentStatus, userId }) {
        return {
          __typename: 'Mutation',
          updateUserPaymentStatus: {
            id: userId,
            paymentStatus,
          },
        }
      },
    })
  const [mutateUpdateCurrentRank] = useMemberInfoPage_UpdateCurrentRankMutation(
    {
      optimisticResponse({ currentRank, userId }) {
        return {
          __typename: 'Mutation',
          updateUserRank: {
            currentRank,
            id: userId,
          },
        }
      },
    },
  )

  //   支払い状況の変更
  const handleChangeIsPaid =
    (userId: string, paymentStatus: PaymentStatus) => async () => {
      await mutateUpdatePaymentStatus({ variables: { paymentStatus, userId } })
      toast({
        duration: 5000,
        isClosable: true,
        status: 'success',
        title: '支払状況を更新しました。',
      })
    }

  //   段位の変更
  const handleChangeRank =
    (userId: string, currentRank: RankKind) => async () => {
      await mutateUpdateCurrentRank({ variables: { currentRank, userId } })
      toast({
        duration: 5000,
        isClosable: true,
        status: 'success',
        title: '段位状況を更新しました。',
      })
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

            {data?.getRegularUsers.map((user) => {
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
                      bg={
                        user.paymentStatus === PaymentStatus.Paid
                          ? 'teal.100'
                          : 'red.100'
                      }
                      borderRadius="full"
                      fontSize="sm"
                      fontWeight="bold"
                      p="3"
                    >
                      {user.paymentStatus === PaymentStatus.Paid ? '済' : '未'}
                    </MenuButton>

                    {/* 支払い状況のリスト */}

                    <MenuList>
                      {/* クリックしたら状態を変更する */}

                      <MenuItem
                        onClick={handleChangeIsPaid(
                          user.id,
                          PaymentStatus.Paid,
                        )}
                      >
                        済
                      </MenuItem>

                      <MenuItem
                        onClick={handleChangeIsPaid(
                          user.id,
                          PaymentStatus.NotPaid,
                        )}
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
            {data?.getRegularUsers.map((user) => {
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
                      bg={RANK_COLOR[user.currentRank]}
                      borderRadius="full"
                      fontSize="sm"
                      fontWeight="bold"
                      p="3"
                    >
                      {user.currentRank}
                    </MenuButton>

                    {/* 段位のリスト */}

                    <MenuList>
                      {/* クリックしたら段位を変更する */}

                      <MenuItem
                        onClick={handleChangeRank(user.id, RankKind.Imperator)}
                      >
                        Intrapel(イントラペル)
                      </MenuItem>

                      <MenuItem
                        onClick={handleChangeRank(user.id, RankKind.Master)}
                      >
                        Master(マスター)
                      </MenuItem>

                      <MenuItem
                        onClick={handleChangeRank(user.id, RankKind.Evangelist)}
                      >
                        Evangelist(エヴァンジェリスト)
                      </MenuItem>

                      <MenuItem
                        onClick={handleChangeRank(user.id, RankKind.Beginner)}
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
