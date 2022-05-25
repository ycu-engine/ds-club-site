import { DefaultLayout } from "../components/DefaultLayout";
import { Box,
    Heading,
    Select,
    UnorderedList,
ListItem, 
Flex,
Button} from '@chakra-ui/react'

import { ReactNode,useCallback,useState } from "react";

const Page = () =>{
    const [isActive,setIsActive] = useState(true)
    const handleActive = useCallback(() => {
        setIsActive((prev) => !prev)
    },[])
    return (
        <DefaultLayout>
            <Flex minWidth='max-content' alignItems='center' gap='3' flexDir='column' w='100vh' pt='20'>
                <Box>
                    <Heading size='4xl' color='0D0D0D'>テスト受験確認ページ</Heading>
                </Box>
                <Box pt = '20' w='50%' pb = '200' pl = '50'>
                    <Heading size='2xl' color='0D0D0D' pb='10'>受験科目</Heading>
                    <Select placeholder='受験科目を選択してください' borderColor='#0D0D0D'>
                        <option value='Datascience'>データサイエンス</option>
                        <option value='Statistics'>統計</option>
                    </Select>
                </Box>
                <Box bg={'#FFFFFE'} borderRadius='lg' alignItems="center" ml = '400'>
                    <Heading size='2xl' color='0D0D0D' pl='10'>注意事項</Heading>  
                    <UnorderedList p = '10'>
                        <ListItem p = '2'>試験時間は70分です</ListItem>
                        <ListItem p = '2'>80%の正答率で合格です</ListItem>
                        <ListItem p = '2'>試験時間中のWebを用いた検索は可能とします。ただし、第三者とともに解くことは禁止です。</ListItem>
                        <ListItem p = '2'>不正が発覚した場合には当該昇格試験の結果は無効とします。また、複数回の不正が発覚した場合は重い処分を下すことがあります。</ListItem>
                        <ListItem p = '2'>疑問点があれば開始前に運営にお聞きください。</ListItem>
                    </UnorderedList>
                </Box>
                <Box>
                    <input type="checkbox" checked={true} name="controlled"　color='#0D0D0D'>注意事項を確認しました</input>
                    {/* <Checkbox color={'#0D0D0D'} borderColor={'#0D0D0D'} pt = '10' display={isActive?'block':'none'}></Checkbox> */}
                </Box>
                <Box>
                    <Button bg={'#FF8E3C'} color={'#0D0D0D'} w='100%' size='lg'  m='200' disabled={handleActive}>
                        テストを開始する
                    </Button>
                </Box>
            </Flex>
        </DefaultLayout>
    );
};

export default Page;