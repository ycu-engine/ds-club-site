import { Header } from "./Header"
import { Sidebar } from "./sidebar"

import { Box, Flex,
   } from '@chakra-ui/react';
import { ReactNode,useCallback,useState } from "react";

type DefaultLayoutProps = {
    children:ReactNode
}



export const DefaultLayout =  ({children}:DefaultLayoutProps) => {
    const [isOpen,setIsOpen] = useState(false)
    const handleClickMenu = useCallback(() => {
        setIsOpen((prev) => !prev)
    },[])
    return (
        <Flex h = '100vh' bg="#EFF0F3" flexDir='column'>
            <Header onClickMenu={handleClickMenu}/>
            <Flex flex={1} overflowY='hidden'>
                <Sidebar display={isOpen?'block':'none'}/>
                {/* </Box> */}
            </Flex>
        </Flex>
    );
};
