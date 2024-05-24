import { Calendar, CalendarProps } from 'antd'
import { FC } from 'react'
import { IEvent } from '../models/IEvent'
import { Dayjs } from 'dayjs';
import { formatDate } from '../utils/formatDate';
import { useNavigate } from 'react-router-dom';

interface EventCalendarProps{
  events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = ({events}) => {
  
    // const monthCellRender = (value: Dayjs) => {
    // не нужна пока эта функция, она для вывода каких-то мероприятий в конкретном месяце, а не дне
    // }

    const navigate = useNavigate();

    const getDateInfo = (date: Date) => {
      const formatedDate = formatDate(new Date(date)).replace(/\./g, "-");

      navigate(`/calendar/${formatedDate}`);
    }

    const dateCellRender = (value: Dayjs) => { // функция проходится по каждому дню и добавляет инфу в тот день где совпала дата мероприятия с датой ячейки в календаре
      const currentDateEvents = events.filter(event => formatDate(new Date(event.date)) === formatDate(value.toDate()));
      
      return (
        <ul className="events" onClick={() => getDateInfo(currentDateEvents[0].date)}>
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
