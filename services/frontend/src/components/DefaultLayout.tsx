import { Header } from './Header'

import { Box, Flex } from '@chakra-ui/react'
import type { ReactNode } from 'react'

type DefaultLayoutProps = {
  children?: ReactNode
  hideHeader?: boolean // ヘッダーを表示するかしないか( trueで隠す )
}

export const DefaultLayout = ({ children, hideHeader }: DefaultLayoutProps) => {
  return (
    <Flex bg="#EFF0F3" flexDir="column" h="200vh">
      {!hideHeader ? <Header /> : null}

      <Flex flex={1}>
        <Box flex={1} overflowY="scroll">
          {children}

          {/* <Sidebar display={isOpen?'block':'none'}/> */}
        </Box>
      </Flex>
    </Flex>
  )
}
