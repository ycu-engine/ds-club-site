import { useRef, useState } from 'react'
import { Button, Text, Container, Box, Flex } from '@chakra-ui/react'
import Calendar from '@toast-ui/react-calendar'

import '@toast-ui/calendar/dist/toastui-calendar.min.css'

import appointments from './appointments'

export const Scheduler = () => {
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
          {formatedDate}
        </Text>
      </Flex>

      <Calendar
        events={appointments}
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
    </Container>
  )
}
