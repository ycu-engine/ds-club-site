import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
const Calendar = dynamic(
  () => import('@toast-ui/react-calendar').then((m) => m.Calendar),
  { ssr: false },
)

interface EventType {
  title: string
  location: string
  start: Date
  end: Date
}
const initialEvents = [
  {
    end: new Date(2022, 9 - 1, 28, 14, 0),
    location: 'hoge',
    start: new Date(2022, 9 - 1, 28, 13, 0),
    title: 'Lunch',
  },
  {
    end: new Date(2022, 9 - 1, 23, 13, 0),
    location: 'カフェ',
    start: new Date(2022, 9 - 1, 22, 13, 0),
    title: 'Coffee Break',
  },
]
export const DScheduler = () => {
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
    <div>
      <div>{date}</div>

      <button onClick={handleClickPrevButton}>{'<'}</button>

      <button onClick={handleClickTodayButton}>today</button>

      <button onClick={handleClickNextButton}>{'>'}</button>

      <Calendar
        events={initialEvents}
        height="300px"
        isReadOnly
        month={{
          dayNames: ['日', '月', '火', '水', '木', '金', '土'],
          visibleWeeksCount: 4,
        }}
        ref={calendarRef}
        useDetailPopup
        view="month"
      />
    </div>
  )
}
