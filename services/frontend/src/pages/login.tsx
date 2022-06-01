import { DefaultLayout } from "../components/DefaultLayout";
import { Box,Flex,Text } from '@chakra-ui/react';

import Logo from '../assets/images/icon.png'
import Image from 'next/image'

const Page = () => {
  return (
    <DefaultLayout>

        <Box px={10} pt={5}>



        <Flex direction='column' h={400} w={400}  justify='center' >

         <Box borderRadius='full' overflow='hidden' boxSize="40px" m='3' mt='4' alignSelf='center'>
            <Image
            width='40px'
            height='40px'
            objectFit='cover'
            src= {Logo}
            alt='icon'
            />
        </Box>

        <Text fontSize="4xl">サインイン</Text>

        <Box background={"#FFFFFE"} h={200} w={200} borderRadius={10}></Box>



        </Flex>

        </Box>



    </DefaultLayout>
  );
};

export default Page;
