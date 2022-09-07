import { useRef, useState } from 'react'
import '@toast-ui/calendar/dist/toastui-calendar.min.css'
import { Button, Text, Container } from '@chakra-ui/react'

import dynamic from 'next/dynamic'
const Calendar = dynamic(() => import('@toast-ui/react-calendar'), {
  ssr: false,
})

import appointments from './appointments'

export const Scheduler = () => {
  const calendarRef = useRef()

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
    <Container>
      <Text>{date}</Text>

      <Button onClick={handleClickPrevButton}>{'<'}</Button>

      <Button onClick={handleClickTodayButton}>today</Button>

      <Button onClick={handleClickNextButton}>{'>'}</Button>

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
