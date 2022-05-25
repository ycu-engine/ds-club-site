import { Box, Heading } from "@chakra-ui/react";
import { Header } from "../components/Header";

const Page = () => {
  return (
    <Box>
      <Header/>

      <Heading fontSize={"9xl"}>選択した</Heading>
    </Box>
  );
};

export default Page;
