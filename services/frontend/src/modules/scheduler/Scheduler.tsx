import { useRef, useState, forwardRef } from 'react'
import { Button, Text, Container, Box, Flex } from '@chakra-ui/react'

import dynamic from 'next/dynamic'
const Calendar = dynamic(() => import('@toast-ui/react-calendar'), {
  ssr: false,
})
import '@toast-ui/calendar/dist/toastui-calendar.min.css'
const CalendarWithForwardedRef = forwardRef(function forwardRefTUICalendar(
  props,
  ref,
) {
  return <Calendar {...props} forwardedRef={ref} />
})

import appointments from './appointments'
import type ToastUIReactCalendar from '@toast-ui/react-calendar'

export const Scheduler = () => {
  const calendarRef = useRef<ToastUIReactCalendar>()

  const now = new Date()
  const [year, month] = [now.getFullYear(), now.getMonth()]
  const [date, setDate] = useState(`${year}年${month + 1}月`)

  const updateCalenderDate = () => {
    const calendarInstance = calendarRef.current.getInstance()

    const displayDate = calendarInstance.getDate()
    setDate(`${displayDate.getFullYear()}年${displayDate.getMonth() + 1}月`)
  }

  const handleClickPrevButton = () => {
    const calendarInstance = calendarRef.current.getInstance()

    calendarInstance.prev()
    updateCalenderDate()
  }
  const handleClickNextButton = () => {
    const calendarInstance = calendarRef.current.getInstance()

    calendarInstance.next()
    updateCalenderDate()
  }

  const handleClickTodayButton = () => {
    const calendarInstance = calendarRef.current.getInstance()

    calendarInstance.today()
    updateCalenderDate()
  }

  return (
    <Container textAlign="center">
      <Flex alignItems="center" justify="space-between" px={5}>
        <Box bg="gray.200" borderRadius={10} color="orange.400" m={1}>
          <Button
            _hover={{ color: 'orange.700' }}
            bg="transparent"
            onClick={handleClickPrevButton}
          >
            {'<'}
          </Button>

          <Button
            _hover={{ color: 'orange.700' }}
            bg="transparent"
            onClick={handleClickTodayButton}
          >
            today
          </Button>

          <Button
            _hover={{ color: 'orange.700' }}
            bg="transparent"
            onClick={handleClickNextButton}
          >
            {'>'}
          </Button>
        </Box>

        <Text
          bg="orange.400"
          borderRadius={10}
          color="white"
          fontWeight="bold"
          p={1}
        >
          {date}
        </Text>
      </Flex>

      <CalendarWithForwardedRef
        events={appointments}
        forwardRef={calendarRef}
        height="60vh"
        isReadOnly
        month={{
          dayNames: ['日', '月', '火', '水', '木', '金', '土'],
          visibleWeeksCount: 4,
        }}
        useDetailPopup
        view="month"
      />
    </Container>
  )
}
