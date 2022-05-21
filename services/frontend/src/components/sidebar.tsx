import { Box,
    BoxProps,
    Button, 
} from '@chakra-ui/react'

type SidebarProps =  BoxProps

export const Sidebar = (props:SidebarProps) => {
    return (
        <Box w = '250px' bg='#FFFFFE'  borderColor= '#0D0D0D' borderRightWidth='2px' overflow='hidden' {...props}>
            <Button borderRadius='30px' background={'#0D0D0D'} color={'#FFFFFE'} size='lg' w='96%' h='80px' m='1' mt='115px' rounded="full" _focus={{ boxShadow: "none"}} >
                個人ページ
            </Button>
            <Button borderRadius='30px' background={'#0D0D0D'} color={'#FFFFFE'} size='lg' w='96%' h='80px' m='1' mt='70px' rounded="full" _focus={{ boxShadow: "none"}} >
                週目標
            </Button>
            <Button borderRadius='30px' background={'#0D0D0D'} color={'#FFFFFE'} size='lg' w='96%' h='80px' m='1' mt='70px' rounded="full" _focus={{ boxShadow: "none"}} >
                教材
            </Button>
            <Button borderRadius='30px' background={'#0D0D0D'} color={'#FFFFFE'} size='lg' w='96%' h='80px'　m='1' mt='70px' rounded="full" _focus={{ boxShadow: "none"}} >
                テスト
            </Button>
            <Button borderRadius='30px' background={'#0D0D0D'} color={'#FFFFFE'} size='lg' w='96%' h='80px'　 m='1' mt='70px' rounded="full" _focus={{ boxShadow: "none"}} >
                資料
            </Button>
        </Box>
    );
  };
  