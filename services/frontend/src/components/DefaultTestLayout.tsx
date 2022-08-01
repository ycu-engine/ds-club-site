import { Header } from './Header'

import { Box, Flex } from '@chakra-ui/react'
import type { ReactNode } from 'react'

type DefaultLayoutProps = {
  children: ReactNode
}

export const DefaultTestLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <Flex bg="#EFF0F3" flexDir="column" h="160vh">
      <Header />

      <Flex flex={1}>
        {/* <Sidebar display={isOpen?'block':'none'}/> */}

        <Box flex={1}>
          {children}

          {/* <Sidebar display={isOpen?'block':'none'}/>  */}
        </Box>
      </Flex>
    </Flex>
  )
}
