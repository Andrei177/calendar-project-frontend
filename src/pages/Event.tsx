import { FC, useEffect, useState } from 'react'
import EventCalendar from '../components/EventCalendar'
import EventForm from '../components/EventForm'
import { getAllEvents } from '../http/calendarAPI/calendarAPI'
import { IEvent } from '../models/IEvent'
import { useAuth } from '../store/useAuth'

const Event: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false)

  const [events, setEvents] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {setIsAuth} = useAuth();

  useEffect(() => {
    getAllEvents()
    .then(res => {
      setEvents(res.events);
      setIsLoading(false);    
    })
    .catch(err => {
      console.log(err, "Ошибка при получении мероприятий, на которые приглашёл пользователь")
      setIsAuth(false); // Разлогинить пользователя, если произошла ошибка при запросе, возможно потому что токен не валидный
      setIsLoading(false); 
    })
  }, [])
  
  return (
    <>
    {isLoading
    ?<h1 className='loader'></h1>
    :<div>
      <EventCalendar events={events}/>
      <div className='wrap-btn'>
        <button className='event-btn' onClick={() => setShowModal(true)}>Добавить событие</button>
      </div>
      {
        showModal && <div className="modal">
          <EventForm setShowModal={setShowModal}/>
        </div>
      }
    </div>
    }
    </>
  )
}

export default Event
