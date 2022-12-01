import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  List,
  ListItem,
  Text,
  useDisclosure,
  useToast,
  Tooltip as ChakraTooltip,
} from '@chakra-ui/react'
import { DeleteButton } from 'components/Button/deleteButton'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import type {
  CategoricalChartProps,
  CategoricalChartState,
} from 'recharts/types/chart/generateCategoricalChart'
import type {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent'
import type { ContentType } from 'recharts/types/component/Tooltip'
import {
  StudyLogPageDocument,
  StudyLog_StudyLogGraphFragment,
  useStudyLogGraph_DeleteStudyLogMutation,
} from '../../../generates/graphql'

const TooltipContent: ContentType<ValueType, NameType> = ({
  active,
  payload,
}) => {
  const item = payload?.[0]?.payload as StudyLog_StudyLogGraphFragment

  if (active && item) {
    return (
      <Box
        bg="whiteAlpha.700"
        border="1px"
        borderColor="gray.300"
        px="2"
        py="1"
      >
        <Text className="tooltipLabel">
          {new Date(item.studiedAt).toLocaleDateString()}
        </Text>

        <Text className="tooltipDesc">{`${item.studyTime}分`}</Text>

        <List>
          <ListItem>{item.studyContent}</ListItem>
        </List>
      </Box>
    )
  }

  return null
}

export type StudyLogGraphProps = Omit<CategoricalChartProps, 'data'> & {
  data: StudyLog_StudyLogGraphFragment[]
}

export const StudyLogGraph = ({ ...props }: StudyLogGraphProps) => {
  const toast = useToast()
  const router = useRouter()
  const userId = router.query['userID'] as string
  const [studyLogGraphDeleteStudyLogMutation, { loading }] =
    useStudyLogGraph_DeleteStudyLogMutation({
      onCompleted: () => {
        toast({
          duration: 5000,
          isClosable: true,
          status: 'success',
          title: '削除しました',
        })
        onClose()
      },
      onError: (error) => {
        toast({
          description: error.message,
          duration: 5000,
          isClosable: true,
          status: 'error',
          title: 'エラー',
        })
      },
      refetchQueries: [{ query: StudyLogPageDocument, variables: { userId } }],
    })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)
  const [clickedData, setClickedData] =
    useState<StudyLog_StudyLogGraphFragment | null>(null)

  const handleClickStudyLog = (e: CategoricalChartState) => {
    const { activePayload } = e
    const item = activePayload?.[0]?.payload as StudyLog_StudyLogGraphFragment
    setClickedData(item)
    onOpen()
  }

  const hanleClickDeleteButton = () => {
    return studyLogGraphDeleteStudyLogMutation({
      variables: {
        id: clickedData?.id ?? '',
        userId: userId,
      },
    })
  }

  return (
    <>
      <LineChart
        height={300}
        margin={{ bottom: 5, left: 0, right: 20, top: 5 }}
        onClick={handleClickStudyLog}
        {...props}
        width={450}
        {...props}
      >
        <CartesianGrid stroke="#ccc" />

        <XAxis
          dataKey="studiedAt"
          tickFormatter={(date: string) => new Date(date).toLocaleDateString()}
        />

        <YAxis />

        <Line dataKey="studyTime" stroke="#8884d8" type="monotone" />

        <Tooltip content={TooltipContent} />
      </LineChart>

      {/* 削除 */}

      <AlertDialog
        isCentered
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        motionPreset="slideInBottom"
        onClose={onClose}
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>この記録を削除しますか？</AlertDialogHeader>

          <AlertDialogCloseButton />

          <AlertDialogBody>
            {clickedData ? (
              <List>
                <ListItem>
                  {new Date(clickedData.studiedAt).toLocaleDateString()}
                </ListItem>

                <ListItem>{`${clickedData.studyTime}分`}</ListItem>

                <ListItem>{clickedData.studyContent}</ListItem>
              </List>
            ) : null}
          </AlertDialogBody>

          <AlertDialogFooter>
            <ChakraTooltip label="クリックして削除">
              <DeleteButton
                isLoading={loading}
                onClick={hanleClickDeleteButton}
              />
            </ChakraTooltip>

            <Button disabled={loading} ml={3} onClick={onClose}>
              閉じる
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
