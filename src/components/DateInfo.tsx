import { FC } from 'react'
import { useEvent } from '../store/useEvent';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';
import { useUsers } from '../store/useUsers';

const DateInfo: FC = () => {
    const {events} = useEvent();

    const navigate = useNavigate(); 
    const location = useLocation();

    const reverseDate = location.pathname.replace("/calendar/", "");
    const date = reverseDate.substring(6, 10) + "-" + reverseDate.substring(3, 5) + "-" + reverseDate.substring(0, 2);

    const {users} = useUsers();
// в этом компоненте по идее осталось стилизовать 
  return (
    <div className='date-info'> 
        <span onClick={() => navigate(-1)} style={{cursor: "pointer", fontSize: 40}}>&larr;</span><br/>
        <h2>События, на которые Вы приглашены {date}</h2>
        <div className='date-info__items'>
          {
          events.filter(event => formatDate(new Date(event.date)) === formatDate(new Date(date))).map(filteredEvent => {
                  return <h2 className='date-info__item' key={filteredEvent.id}>{filteredEvent.description}<br/>
                    Автор: {users.find(user => user.id == filteredEvent.author_id)?.email}</h2>
              })
          }
        </div>
    </div>
  )
  // тут остановился кароче - надо проверить сравнение дат // проверил всё ОК теперь
}

export default DateInfo
