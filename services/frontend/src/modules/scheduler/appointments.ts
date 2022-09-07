import type { EventObject } from '@toast-ui/calendar/types/types/events.d.ts'

// イベントの設定日時の範囲 (YYYY, MM, DD) MMは-1して補正
const loopStartDate: Date = new Date(2022, 7 - 1, 20)
const loopEndDate: Date = new Date(2022, 10 - 1, 20)

//
type DayAppointmentTemplate = {
  title: string
  startHourMinite: [number, number]
  endHourMinite: [number, number]
  location: string
}
// 火曜日のテンプレート
const tuesdayAppointmentTemplate: DayAppointmentTemplate = {
  endHourMinite: [19, 0],
  location: 'zoom',
  startHourMinite: [18, 0],
  title: '週目標の設定',
}
// 金曜日のテンプレート
const fridayAppointmentTemplate: DayAppointmentTemplate = {
  endHourMinite: [20, 0],
  location: '5号館305',
  startHourMinite: [18, 0],
  title: '勉強会',
}

// appointを作成する関数を定義
type makeAppointmentType = (
  date: Date,
  dayTemplate: DayAppointmentTemplate,
) => EventObject
const makeAppointment: makeAppointmentType = (date, dayTemplate) => {
  const [startHour, startMinite] = dayTemplate.startHourMinite
  const [endHour, endMinite] = dayTemplate.endHourMinite
  return {
    end: new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      endHour,
      endMinite,
    ),
    location: dayTemplate.location,
    start: new Date(
      date.getFullYear(),
      date.getMonth(), //JSの仕様なので補正
      date.getDate(),
      startHour,
      startMinite,
    ),
    title: dayTemplate.title,
  }
}
const appointments: EventObject[] = []
// 期間内でループしてイベントを設定していく
let loopDate = new Date(loopStartDate)
while (loopDate <= loopEndDate) {
  // 1日進めてrecast
  const newDate = loopDate.setDate(loopDate.getDate() + 1)
  loopDate = new Date(newDate)
  switch (loopDate.getDay()) {
    // 火曜日
    case 2:
      appointments.push(makeAppointment(loopDate, tuesdayAppointmentTemplate))
      break
    // 金曜日
    case 5:
      appointments.push(makeAppointment(loopDate, fridayAppointmentTemplate))
      break
    default:
      break
  }
}

// 特別なイベントの設定
const BBQEvent: EventObject = {
  end: new Date(2022, 9 - 1, 10, 15, 0),
  location: '海の公園',
  start: new Date(2022, 9 - 1, 10, 10, 0),
  title: 'BBQ',
}
appointments.push(BBQEvent)
export default appointments
