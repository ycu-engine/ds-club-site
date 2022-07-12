import { DefaultLayout } from "../components/DefaultLayout";
import { Header } from '../components/Header';
import { 
  Button,
  Box,
  Container,
  Grid,
  GridItem,
  Text,
  Select,
  Input,
  Center,
 } from '@chakra-ui/react';

const Page = () => {
  return (
    <div>
    <DefaultLayout >
      <Grid templateColumns='repeat(2, 1fr)' templateRows='repeat(5, 1fr)' gap={6}>
        <GridItem w='100%' rowSpan={5} colSpan={1}>
          <Box borderWidth='2px' borderRadius='20px' overflow='hidden' m='12px' p='12px' bg='white'>
            <Text fontSize={32}>学習時間の記録</Text>
            <Box borderWidth='2px' borderRadius='20px' overflow='hidden' mt='12px' p='12px'>
              <Text>期間</Text>
              <Select id='start' placeholder='開始日時を選択'>
                <option>データピッカー用のライブラリを導入したい</option>
                <option>データピッカー用のライブラリを導入したい</option>
              </Select>
              <Text>から</Text>
              <Select id='end' placeholder='終了日時を選択'>
                <option>データピッカー用のライブラリを導入したい</option>
                <option>データピッカー用のライブラリを導入したい</option>
              </Select>
              <Text>まで</Text>
            </Box>
            <Box borderWidth='2px' borderRadius='20px' overflow='hidden' mt='12px' p='12px'>
              チャート
            </Box>
          </Box>
        </GridItem >
        <GridItem w='100%' rowSpan={2} colSpan={1}>
          <Box borderWidth='2px' borderRadius='20px' overflow='hidden' m='12px' p='12px' bg='white'>
            <Text fontSize={24}>名前：浦 優太</Text>
            <Text fontSize={24}>会員：一般会員</Text>
          </Box>
        </GridItem>
        <GridItem w='100%' rowSpan={3} colSpan={1}>
          <Box borderWidth='2px' borderRadius='20px' overflow='hidden' m='12px' p='12px' bg='white'>
            <Text mt='12px'>勉強内容</Text>
            <Input mt='12px' placeholder='勉強内容' rounded='full' />
            <Text mt='12px'>勉強時間</Text>
            <Input mt='12px' placeholder='勉強時間' rounded="full" />
            <Text mt='12px'>記入日</Text>
            <Input mt='12px' placeholder='記入日' rounded="full" />
            <Center h='100%'>
              <Button mt='12px'>追加</Button>
            </Center>
          </Box>
        </GridItem>
      </Grid>
      </DefaultLayout>
    </div>
  );
};

export default Page;
