import { FC, useEffect, useState } from 'react'
import { useEvent } from '../store/useEvent';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';
import { useUsers } from '../store/useUsers';
import { useUser } from '../store/useUser';
import { getUsersByEvent } from '../http/calendarAPI/calendarAPI';
import { nanoid } from 'nanoid';

const DateInfo: FC = () => {
    const {events} = useEvent();
    const {id} = useUser();

    const navigate = useNavigate(); 
    const location = useLocation();

    const reverseDate = location.pathname.replace("/calendar/", "");
    const date = reverseDate.substring(6, 10) + "-" + reverseDate.substring(3, 5) + "-" + reverseDate.substring(0, 2);

    const {users} = useUsers();

    interface UserByEvent{
      eventId: number,
      userId: number
    }

    const [usersByEvent, setUsersByEvent] = useState<UserByEvent[]>([]);

    useEffect(() => {
      const filteredEvents = events.filter(event => formatDate(new Date(event.date)) === formatDate(new Date(date))).filter(e => e.author_id === id);
      const filteredEventsIds: number[] = [];
      filteredEvents.forEach(e => filteredEventsIds.push(e.id));

      getUsersByEvent(filteredEventsIds)
      .then(res => setUsersByEvent(res))
      .catch(err => console.log(err, "Ошибка при получении пользователей по событию"))
    }, [])
// в этом компоненте по идее осталось стилизовать 
  return (
    <div style={{display: "flex", flexDirection: "column", gap: "15px"}}>
    <div className='date-info'> 
        <span onClick={() => navigate("/calendar")} style={{cursor: "pointer", fontSize: 40}}>&larr;</span><br/>
        <h2>События, на которые Вы приглашены {date}</h2>
        <div className='date-info__items'>
          {
          events.filter(event => formatDate(new Date(event.date)) === formatDate(new Date(date))).filter(e => e.author_id !== id).map(filteredEvent => {
                  return <h2 className='date-info__item' key={filteredEvent.id}>{filteredEvent.description}<hr/>
                    Автор: {users.find(user => user.id == filteredEvent.author_id)?.email}</h2>
              })
          }
        </div>
    </div>
    <div className='date-info'> 
      <span onClick={() => navigate("/calendar")} style={{cursor: "pointer", fontSize: 40}}>&larr;</span><br/>
      <h2>События, на которые Вы пригласили других пользователей {date}</h2>
      <div className='date-info__items'>
        {
        events.filter(event => formatDate(new Date(event.date)) === formatDate(new Date(date))).filter(e => e.author_id === id).map(filteredEvent => {
              return <h2 className='date-info__item' key={filteredEvent.id}>{filteredEvent.description}<hr/>
                Приглашенные гости: {usersByEvent.filter(item => item.eventId === filteredEvent.id).map(user => <div key={nanoid()}> {users.find(userItem => userItem.id === user.userId)?.email} </div>)}</h2>
          })
        }
      </div>
    </div>
</div>
  )
  // тут остановился кароче - надо проверить сравнение дат // проверил всё ОК теперь
}

export default DateInfo
