import { DefaultLayout } from "../components/DefaultLayout";
import { Box,
    Heading,
    Select,
    UnorderedList,
ListItem, 
Flex,
Button,
Checkbox} from '@chakra-ui/react'

import { useCallback,useState } from "react";

const Page = () =>{
    const [isActive,setIsActive] = useState(false)
    const handleOnChange = useCallback(() => {
        setIsActive((prev) => !prev)
    },[])
    
    return (
        <DefaultLayout>
            <Flex minWidth='max-content' alignItems='center' gap='3' flexDir='column' justify-content='center' w='100vh'>
                <Box>
                    <Heading size='4xl' color='0D0D0D'>テスト受験確認ページ</Heading>
                </Box>
                <Box>
                    <Heading size='2xl' color='0D0D0D'>受験科目</Heading>
                    <Select placeholder='受験科目を選択してください' borderColor='#0D0D0D'>
                        <option value='Datascience'>データサイエンス</option>
                        <option value='Statistics'>統計</option>
                    </Select>
                </Box>
                <Box bg={'#FFFFFE'} borderRadius='lg' alignItems="center">
                    <Heading size='2xl' color='0D0D0D'>注意事項</Heading>  
                    <UnorderedList>
                        <ListItem>試験時間は70分です</ListItem>
                        <ListItem>80%の正答率で合格です</ListItem>
                        <ListItem>試験時間中のWebを用いた検索は可能とします。ただし、第三者とともに解くことは禁止です。</ListItem>
                        <ListItem>不正が発覚した場合には当該昇格試験の結果は無効とします。また、複数回の不正が発覚した場合は重い処分を下すことがあります。</ListItem>
                        <ListItem>疑問点があれば開始前に運営にお聞きください。</ListItem>
                    </UnorderedList>
                </Box>
                <Box>
                    {/* <input type="checkbox" checked={true} name="controlled"　color='#0D0D0D'>注意事項を確認しました</input> */}
                    <Checkbox color={'#0D0D0D'} borderColor={'#0D0D0D'} isChecked={isActive} onChange={handleOnChange}>注意事項を確認しました</Checkbox>
                </Box>
                <Box>
                    <Button bg={'#FF8E3C'} color={'#0D0D0D'} size='lg' isDisabled={!isActive}>
                        テストを開始する
                    </Button>
                </Box>
            </Flex>
        </DefaultLayout>
    );
};

export default Page;