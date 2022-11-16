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
  Circle,
  AspectRatio,
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
    <AspectRatio
      bgImg={NewsBgImage.src}
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="contain"
      height="100%"
      justifyContent="center"
      minW="50%"
      overflow="hidden"
      ratio={NewsBgImage.width / NewsBgImage.height}
      {...containerProps}
    >
      <Tabs
        colorScheme="green"
        display="flex"
        flexDir="column"
        h="70%"
        isManual={false}
        maxW="70%"
        mx="auto"
        pt="10%"
        variant="soft-rounded"
      >
        {children}
      </Tabs>
    </AspectRatio>
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
        borderWidth={['thin', 'medium']}
        h="65%"
        overflow="scroll"
        w="50%"
      >
        {newsList.map((news) => {
          return (
            <TabPanel key={news.title}>
              <Box>
                <Heading fontSize={['lg', 'xl']}>{news.title}</Heading>

                <Text fontSize={['xs', 'sm']} px="1">
                  {news.body}
                </Text>
              </Box>
            </TabPanel>
          )
        })}
      </TabPanels>

      <TabList justifyContent="center" pt="2">
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
              mx="2"
              p="0"
              size={['15px', '20px']}
            />
          )
        })}
      </TabList>
    </NewsTabWrapper>
  )
}

export default NewsTab
