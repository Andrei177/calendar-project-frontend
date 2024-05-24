import { FC, useEffect, useState } from 'react'
import EventCalendar from '../components/EventCalendar'
import EventForm from '../components/EventForm'
import { getAllEvents } from '../http/calendarAPI/calendarAPI'
import { useAuth } from '../store/useAuth'
import { useEvent } from '../store/useEvent'
import { getAllUsers } from '../http/userAPI/userAPI'
import { useUsers } from '../store/useUsers'
import { useUser } from '../store/useUser'
import { jwtDecode } from 'jwt-decode'

const Event: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false)

  const {events, setEvents} = useEvent();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {setIsAuth} = useAuth();
  const {setUsers} = useUsers();

  const {setId, setEmail} = useUser();

  useEffect(() => {
    const token: any = localStorage.getItem("token");

    if(token){
      const user: any = jwtDecode(token);
      if(user){
        setId(user.id);
        setEmail(user.email);
      }
    }

    getAllEvents()
    .then(res => {
      setEvents(res.events);
      setIsLoading(false);    
    })
    .catch(err => {
      console.log(err, "Ошибка при получении мероприятий, на которые приглашёл пользователь")
      if(err.response.status === 403) {
        setIsAuth(false); // Разлогинить пользователя, если произошла ошибка при запросе, возможно потому что токен не валидный
        setIsLoading(false); 
      }
    })

    getAllUsers()
    .then(res => {
      setUsers(res.users)
    })
    .catch(err => console.log(err, 'Ошибка при получении всех пользователей'))
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
