import { Header } from './Header'

import { Box, Flex } from '@chakra-ui/react'
import { Fragment, ReactNode } from 'react'
import { Authenticated } from '../Authenticated'
import { useDefaultLayoutQuery } from '../../generates/graphql'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../clients/firebase'

type DefaultLayoutProps = {
  children?: ReactNode
  hideHeader?: boolean // ヘッダーを表示するかしないか( trueで隠す )
  authenticated?: boolean
}

export const DefaultLayout = ({
  children,
  hideHeader,
  authenticated = true,
}: DefaultLayoutProps) => {
  const [user, _loading] = useAuthState(auth)
  const { data } = useDefaultLayoutQuery({
    variables: {
      userId: user?.uid || '',
    },
  })
  const Wrapper = authenticated ? Authenticated : Fragment
  return (
    <Wrapper>
      <Flex bg="#EFF0F3" flexDir="column" h="100vh">
        {!hideHeader ? <Header userName={data?.getUser.name} /> : null}

        <Flex flex={1} overflowY="hidden">
          <Box flex={1} overflowY="scroll">
            {children}
          </Box>
        </Flex>
      </Flex>
    </Wrapper>
  )
}
