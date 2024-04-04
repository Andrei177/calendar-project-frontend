import { Calendar } from 'antd'
import { FC } from 'react'
import { IEvent } from '../models/IEvent'

interface EventCalendarProps{
  events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = ({events}) => {
  return (
    <Calendar/>
  )
}

export default EventCalendar
