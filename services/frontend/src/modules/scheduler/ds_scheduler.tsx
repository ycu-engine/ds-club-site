import { styled, alpha } from '@mui/material/styles'
import { Resource, ViewState } from '@devexpress/dx-react-scheduler'
import {
  Scheduler,
  Appointments,
  MonthView,
  Toolbar,
  DateNavigator,
  TodayButton,
  Resources,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui'
import { indigo, blue, teal } from '@mui/material/colors'
import classNames from 'clsx'
import appointments from './appointments'

const classes = {
  appointment: 'appointment',
  container: 'container',
  content: 'content',
  text: 'text',
  weekEndCell: 'weekEndCell',
  weekEndDayScaleCell: 'weekEndDayScaleCell',
}

// 休日のセルの見出しを設定
// SunとSatの部分を変更することができる
const StyledMonthViewDayScaleCell = styled(MonthView.DayScaleCell)(
  ({ theme: { palette } }) => ({
    [`&.${classes.weekEndDayScaleCell}`]: {
      backgroundColor: alpha(palette.action.disabledBackground, 0.06),
    },
  }),
)

// 休日のセル部分を変更できる
const StyledMonthViewTimeTableCell = styled(MonthView.TimeTableCell)(
  ({ theme: { palette } }) => ({
    [`&.${classes.weekEndCell}`]: {
      '&:focus': {
        backgroundColor: alpha(palette.action.disabledBackground, 0.04),
      },
      '&:hover': {
        backgroundColor: alpha(palette.action.disabledBackground, 0.04),
      },
      backgroundColor: alpha(palette.action.disabledBackground, 0.04),
    },
  }),
)

// 予定がある場合のセルの見た目を変更
const StyledAppointmentsAppointment = styled(Appointments.Appointment)(() => ({
  [`&.${classes.appointment}`]: {
    borderRadius: 10,
    paddingTop: 10,
  },
}))

// 予定がある場合のセル内部の見た目を変更
const StyledAppointmentsAppointmentContent = styled(
  Appointments.AppointmentContent,
)(() => ({
  // セル内テキスト全般
  [`& .${classes.text}`]: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  // locationなど
  [`& .${classes.content}`]: {
    opacity: 0.7,
  },
  [`& .${classes.container}`]: {
    height: '100%',
    lineHeight: 1.2,
    width: '100%',
  },
}))

const resources: Resource[] = [
  {
    fieldName: 'location',
    instances: [
      { color: indigo, id: 'zoom', text: 'zoom' },
      { color: blue, id: '5号館305', text: '5号館305' },
      { color: teal, id: 'ラウンジ', text: 'ラウンジ' },
      { color: 'orange', id: '海の公園', text: '海の公園' },
    ],
    title: 'Location',
  },
]

// 土日の判定
const isWeekEnd = (date: Date): boolean =>
  date.getDay() === 0 || date.getDay() === 6
const defaultCurrentDate = new Date()

const DayScaleCell = ({
  startDate,
  ...restProps
}: MonthView.DayScaleCellProps) => (
  <StyledMonthViewDayScaleCell
    className={classNames({
      [classes.weekEndDayScaleCell]: isWeekEnd(startDate),
    })}
    startDate={startDate}
    {...restProps}
  />
)

const TimeTableCell = ({
  startDate,
  ...restProps
}: MonthView.TimeTableCellProps) => (
  <StyledMonthViewTimeTableCell
    className={classNames({
      [classes.weekEndCell]: isWeekEnd(startDate),
    })}
    startDate={startDate}
    {...restProps}
  />
)

const Appointment = ({ data, ...restProps }: Appointments.AppointmentProps) => (
  <StyledAppointmentsAppointment
    {...restProps}
    className={classNames(classes.appointment)}
    data={data}
  />
)

// #FOLD_BLOCK
const AppointmentContent = ({
  data,
  ...restProps
}: // #FOLD_BLOCK
Appointments.AppointmentContentProps) => {
  return (
    <StyledAppointmentsAppointmentContent {...restProps} data={data}>
      <div className={classes.container}>
        <div className={classes.text}>{data.title}</div>

        <div className={classNames(classes.text, classes.content)}>
          {`Location: ${data['location']}`}
        </div>
      </div>
    </StyledAppointmentsAppointmentContent>
  )
}

export const DSScheduler = () => {
  return (
    <>
      <Scheduler data={appointments}>
        <ViewState defaultCurrentDate={defaultCurrentDate} />

        <MonthView
          dayScaleCellComponent={DayScaleCell}
          timeTableCellComponent={TimeTableCell}
        />

        <Appointments
          appointmentComponent={Appointment}
          appointmentContentComponent={AppointmentContent}
        />

        <Resources data={resources} />

        <AppointmentTooltip showCloseButton />

        <Toolbar />

        <DateNavigator />

        <TodayButton />
      </Scheduler>
    </>
  )
}
