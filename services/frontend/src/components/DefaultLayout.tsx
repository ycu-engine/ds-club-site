import { Header } from './Header'

import { Box, Flex } from '@chakra-ui/react'
import { ReactNode, useCallback, useState } from 'react'

type DefaultLayoutProps = {
  children: ReactNode
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleClickMenu = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])
  return (
    <Flex bg="#EFF0F3" flexDir="column" h="200vh">
      <Header />

      <Flex flex={1}>
        <Box flex={1} overflowY="scroll">
          {children}

          {/* <Sidebar display={isOpen?'block':'none'}/> */}
        </Box>
      </Flex>
    </Flex>
  )
}
