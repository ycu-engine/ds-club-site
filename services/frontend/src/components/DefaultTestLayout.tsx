import { Header } from './Header'

import { Box, Flex } from '@chakra-ui/react'
import type { ReactNode} from 'react';
import { useCallback, useState } from 'react'

type DefaultLayoutProps = {
  children: ReactNode
}

export const DefaultTestLayout = ({ children }: DefaultLayoutProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleClickMenu = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])
  return (
    <Flex bg="#EFF0F3" flexDir="column" h="160vh">
      <Header onClickMenu={handleClickMenu} />

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
