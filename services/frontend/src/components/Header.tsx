import { Box,Image,Text, Flex,Spacer,Heading,Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton
 } from '@chakra-ui/react';

 import { HamburgerIcon,
 } from '@chakra-ui/icons';

export const Header = () => {
  return (
    <Box w='100%' h="73px" backgroundColor='#E5E5E5'>
      <Flex minWidth='max-content' alignItems='center' gap='2'>
        <Box>
          <Image p='2' m='2'
            borderRadius='full'
            boxSize='60px'
            src='https://bit.ly/dan-abramov'
            alt='icon'
          />
        </Box>
        <Box p ='1'>
          <Heading size='lg' m ='1'> DataScienceClub</Heading>
        </Box>
        <Spacer />
        <Box>
          <Text fontsize='3xl' p='2'>Kakeru Sato</Text>
        </Box>
        <Box>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HamburgerIcon />}
              variant='outline'
              color='#FF8E3C'
              boxSize ='2'
            />
            <MenuList>
              <MenuItem>
                個人ページ
              </MenuItem>
              <MenuItem>
                週目標記入ページ
              </MenuItem>
              <MenuItem>
                教材
              </MenuItem>
              <MenuItem>
                テスト
              </MenuItem>
              <MenuItem>
                資料
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};
