import { useRef, useState } from 'react'
import {
  Button,
  Text,
  Container,
  Flex,
  useDisclosure,
  Tooltip,
  Spinner,
  IconProps,
} from '@chakra-ui/react'
import Calendar from '@toast-ui/react-calendar'
import '@toast-ui/calendar/dist/toastui-calendar.min.css'
import { EditFormModal } from './EditForm/EditFormModal'
import { EditIcon } from '@chakra-ui/icons'
import { SchedulerFragment, UserRole } from '../../generates/graphql'
import type { EventObject } from '@toast-ui/calendar/types/types/events.d.ts'
import type { DocumentNode } from '@apollo/client'

interface DateSelectButtonProps {
  onClick: () => void
  children?: React.ReactNode
}
const DateSelectButton = ({ onClick, children }: DateSelectButtonProps) => {
  return (
    <Button _hover={{ color: 'orange.700' }} bg="transparent" onClick={onClick}>
      {children}
    </Button>
  )
}

type EditButtonProps = {
  onClick: () => void
  roles?: UserRole[]
} & IconProps
const EditButton = ({ onClick, roles, ...props }: EditButtonProps) => {
  if (!roles?.includes(UserRole.Admin) && !roles?.includes(UserRole.Staff)) {
    return null
  }
  return (
    <Tooltip label="編集画面を開く">
      <EditIcon
        _hover={{ color: 'gray.600', cursor: 'pointer' }}
        as="button"
        boxSize="1.5rem"
        onClick={onClick}
        {...props}
      />
    </Tooltip>
  )
}

// Dynamic importsのためにpropsの型定義を用意しておく
export type SchedulerProps = {
  schedulerData: SchedulerFragment
  isLoading: boolean
  refetchQueryDoc: DocumentNode
}
export const Scheduler = ({
  schedulerData: result,
  isLoading,
  refetchQueryDoc,
}: SchedulerProps) => {
  const { roles } = result.getUser
  const events = result.getEvents
  const fmtEvents: EventObject[] = events.map((event) => {
    return {
      ...event,
      isReadOnly: true,
    }
  })

  const { isOpen, onOpen, onClose } = useDisclosure()

  const calendarRef = useRef<Calendar>(null)

  const [date, setDate] = useState(new Date())

  const updateCalenderDate = () => {
    const calendarInstance = calendarRef.current?.getInstance()

    const displayDate = calendarInstance?.getDate().toDate()
    if (displayDate) {
      setDate(displayDate)
    }
  }

  const handleClickPrevButton = () => {
    const calendarInstance = calendarRef.current?.getInstance()

    if (calendarInstance) {
      calendarInstance.prev()
      updateCalenderDate()
    }
  }
  const handleClickNextButton = () => {
    const calendarInstance = calendarRef.current?.getInstance()

    if (calendarInstance) {
      calendarInstance.next()
      updateCalenderDate()
    }
  }

  const handleClickTodayButton = () => {
    const calendarInstance = calendarRef.current?.getInstance()

    if (calendarInstance) {
      calendarInstance.today()
      updateCalenderDate()
    }
  }

  const formatedDate = `${date.getFullYear()}年${date.getMonth() + 1}月`

  return (
    <Container textAlign="center">
      <Flex alignItems="center" justify="space-between" px={5}>
        <Flex bg="gray.200" borderRadius={10} color="orange.400" m={1}>
          <DateSelectButton onClick={handleClickPrevButton}>
            {'<'}
          </DateSelectButton>

          <DateSelectButton onClick={handleClickTodayButton}>
            today
          </DateSelectButton>

          <DateSelectButton onClick={handleClickNextButton}>
            {'>'}
          </DateSelectButton>
        </Flex>

        <Flex alignItems="center">
          <Text
            bg="orange.400"
            borderRadius={10}
            color="white"
            fontWeight="bold"
            mx={1}
            p={1}
          >
            {formatedDate}
          </Text>

          <EditButton onClick={onOpen} roles={roles} />
        </Flex>
      </Flex>

      {isLoading ? (
        <Flex alignItems="center" h="60vh" justifyContent="center">
          <Spinner size="lg" />
        </Flex>
      ) : (
        <Calendar
          events={fmtEvents}
          height="60vh"
          isReadOnly
          month={{
            dayNames: ['日', '月', '火', '水', '木', '金', '土'],
            visibleWeeksCount: 4,
          }}
          ref={calendarRef}
          useDetailPopup
          view="month"
        />
      )}

      <EditFormModal
        isOpen={isOpen}
        onClose={onClose}
        refetchQueryDoc={refetchQueryDoc}
      />
    </Container>
  )
}
