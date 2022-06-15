import { Box, BoxProps, Button } from '@chakra-ui/react'

type SidebarProps = BoxProps

export const Sidebar = (props: SidebarProps) => {
  return (
    <Box
      bg="#FFFFFE"
      borderColor="#0D0D0D"
      borderRightWidth="2px"
      overflow="hidden"
      w="250px"
      {...props}
    >
      <Button
        _focus={{ boxShadow: 'none' }}
        background="#0D0D0D"
        borderRadius="30px"
        color="#FFFFFE"
        h="80px"
        m="1"
        mt="115px"
        rounded="full"
        size="lg"
        w="96%"
      >
        個人ページ
      </Button>

      <Button
        _focus={{ boxShadow: 'none' }}
        background="#0D0D0D"
        borderRadius="30px"
        color="#FFFFFE"
        h="80px"
        m="1"
        mt="70px"
        rounded="full"
        size="lg"
        w="96%"
      >
        週目標
      </Button>

      <Button
        _focus={{ boxShadow: 'none' }}
        background="#0D0D0D"
        borderRadius="30px"
        color="#FFFFFE"
        h="80px"
        m="1"
        mt="70px"
        rounded="full"
        size="lg"
        w="96%"
      >
        教材
      </Button>

      <Button
        _focus={{ boxShadow: 'none' }}
        background="#0D0D0D"
        borderRadius="30px"
        color="#FFFFFE"
        h="80px"
        m="1"
        mt="70px"
        rounded="full"
        size="lg"
        w="96%"
      >
        テスト
      </Button>

      <Button
        _focus={{ boxShadow: 'none' }}
        background="#0D0D0D"
        borderRadius="30px"
        color="#FFFFFE"
        h="80px"
        m="1"
        mt="70px"
        rounded="full"
        size="lg"
        w="96%"
      >
        資料
      </Button>
    </Box>
  )
}
