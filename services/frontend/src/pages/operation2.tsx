import { Box, Text, Center,Flex, Select } from "@chakra-ui/react";
import { DefaultLayout } from "../components/DefaultLayout";

const RectBox: React.FC = () => (
  <Box bg='gray.500' boxSize={100} />
)

const Page = () => {
  return (

    <DefaultLayout>
    <Flex h={100} w={400} justify='center' align='center' bg='gray.100'>

      <Text fontSize="4xl">選択した人物</Text>
      <Select placeholder='選択画面'>
        <option value="諸田健太朗">諸田健太朗</option>
        <option value="佐藤駿">佐藤駿</option>
        <option value="川島一翔">川島一翔</option>
      </Select>

    </Flex>

    <Box h={200} bg='gray.100'>
    <Center h='100%'>
      <RectBox />
    </Center>
    </Box>

    <Flex h={200} justify='center' align='center' bg='gray.100'>
    <RectBox />
    </Flex>



    </DefaultLayout>

  );
};

export default Page;
