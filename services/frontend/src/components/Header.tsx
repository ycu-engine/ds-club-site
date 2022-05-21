import { Box,Text, Flex,Spacer,Heading,Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton
 } from '@chakra-ui/react';

 import { HamburgerIcon,
 } from '@chakra-ui/icons';

 import Logo from '../assets/images/icon.png'

 import Image from 'next/image'

type HeaderProps = {
  onClickMenu:() => unknown
}



export const Header = ({onClickMenu}:HeaderProps) => {
  return (
    <Box w='100%' h="70px" backgroundColor='#E5E5E5'>
      <Flex minWidth='max-content' alignItems='center' gap='2'>
        <Box borderRadius='full' overflow='hidden' boxSize="40px" m='3' mt='4' >
          <Image 
          width='40px'
          height='40px'
          objectFit='cover'
          // p='2' m='2'
          //   borderRadius='full'
          //   boxSize='60px'
            src= {Logo}
            alt='icon'
          />
        </Box>
        <Box p ='1'>
          <Heading size='lg' mt = '1'> DataScienceClub</Heading>
        </Box>
        <Spacer />
        <Box>
          <Text fontsize='3xl' p='2'>Kakeru Sato</Text>
        </Box>
        <Box>
            <IconButton
              aria-label='メニュー'
              icon={<HamburgerIcon />}
              variant='outline'
              color='#FF8E3C'
              boxSize ='2'
              onClick = {
                onClickMenu
              }
            />
        </Box>
      </Flex>
    </Box>
  );
};
