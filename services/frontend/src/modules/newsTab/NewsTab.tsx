import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  Heading,
  TabPanel,
  Text,
  Spinner,
  ContainerProps,
  Container,
  Circle,
} from '@chakra-ui/react'
import type { ReactNode } from 'react'
import type { NewsTabFragment } from '../../generates/graphql'
import NewsBgImage from '../../assets/images/topPage/info_bg.png'

type NewsTabWrapperProps = {
  children?: ReactNode
} & ContainerProps
const NewsTabWrapper = ({
  children,
  ...containerProps
}: NewsTabWrapperProps) => {
  return (
    <Container
      bg="blackAlpha.100"
      bgImg={NewsBgImage.src}
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="contain"
      h="50vh"
      minW="40%"
      {...containerProps}
    >
      <Tabs
        colorScheme="green"
        h="70%"
        isManual={false}
        mt="20%"
        mx="auto"
        variant="soft-rounded"
        w="70%"
      >
        {children}
      </Tabs>
    </Container>
  )
}

type NewsTabProps = {
  newsList?: NewsTabFragment[]
  isLoading: boolean
} & ContainerProps
export const NewsTab = ({
  newsList,
  isLoading: loading,
  ...containerProps
}: NewsTabProps) => {
  if (loading) {
    return (
      <NewsTabWrapper {...containerProps}>
        <Spinner size="lg" />
      </NewsTabWrapper>
    )
  }

  if (!newsList || newsList.length === 0) {
    return (
      <NewsTabWrapper {...containerProps}>
        <Heading fontSize="lg" p="5">
          現在お知らせはありません
        </Heading>
      </NewsTabWrapper>
    )
  }
  return (
    <NewsTabWrapper {...containerProps}>
      <TabPanels
        borderColor="black"
        borderRadius="3xl"
        borderWidth="thick"
        h="70%"
        mb="5%"
        overflow="scroll"
        p="3"
        pt="0"
        w="50%"
      >
        {newsList.map((news) => {
          return (
            <TabPanel key={news.title}>
              <Box>
                <Heading fontSize={['xl', '2xl', '3xl']}>{news.title}</Heading>

                <Text>{news.body}</Text>
              </Box>
            </TabPanel>
          )
        })}
      </TabPanels>

      <TabList justifyContent="center">
        {newsList.map((news) => {
          return (
            <Tab
              _focus={{ outline: 'none' }}
              _hover={{ cursor: 'pointer' }}
              _selected={{ bg: 'black' }}
              as={Circle}
              borderColor="black"
              borderRadius="full"
              borderWidth="thin"
              key={news.title}
              mx="1"
              p="0"
              size="20px"
            />
          )
        })}
      </TabList>
    </NewsTabWrapper>
  )
}

export default NewsTab
