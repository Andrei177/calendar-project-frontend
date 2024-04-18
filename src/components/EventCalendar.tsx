import { Calendar, CalendarProps } from 'antd'
import { FC } from 'react'
import { IEvent } from '../models/IEvent'
import { Dayjs } from 'dayjs';
import { formatDate } from '../utils/formatDate';

interface EventCalendarProps{
  events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = ({events}) => {
  
    // const monthCellRender = (value: Dayjs) => {
    // не нужна пока эта функция, она для вывода каких-то мероприятий с конкретном месяце, а не дне
    // }
  
    const dateCellRender = (value: Dayjs) => {
      const currentDateEvents = events.filter(event => event.date === formatDate(value.toDate()));

      return (
        <ul className="events">
          {currentDateEvents.map((item, index) => (
            <li key={index}>
              {item.description}
            </li>
          ))}
        </ul>
      );
    };
  
    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
      if (info.type === 'date') return dateCellRender(current);
      //if (info.type === 'month') return monthCellRender(current);
      //return info.originNode;
    };

  return (
    <Calendar
      cellRender={cellRender}
    />
  )
}

export default EventCalendar
