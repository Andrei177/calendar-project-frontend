import { DatePicker } from 'antd'
import { FC, useEffect, useState } from 'react'
import { IUser } from '../models/IUser';
import { createEvent } from '../http/calendarAPI/calendarAPI';
import { useUsers } from '../store/useUsers';
import { useUser } from '../store/useUser';

interface EventFormProps{
    setShowModal: (bool: boolean) => void
}
type TypeEvent={
  $d: Date;
}
interface ISelectUser extends IUser{
  select: boolean
}

const EventForm: FC<EventFormProps> = ({setShowModal}) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [showList, setShowList] = useState<boolean>(false);
  const [selectedUsers, setSelectedUsers] = useState<ISelectUser[]>([]); // состояние для хранения выбранных пользователей
  const {id: author_id} = useUser();
  const {users} = useUsers();

  useEffect(() => {
    setSelectedUsers(users.map((user: IUser) => {
      const selectUser: ISelectUser = {
        ...user,
        select: false
      } 
      return selectUser;
      })
    )
  }, [])

  const addEvent = () => {
    const invitedUsers: IUser[] = selectedUsers.filter(user => user.select === true);

    if(!(description && date && author_id && invitedUsers.length)){
      return alert("Вы не заполнили некоторые данные для создания мероприятия! Пожалуйста проверьте, что Вы выбрали дату, описание и пригласили пользователей");
    }

    createEvent({description, date, author_id, invitedUsers})
    .then((res) => {
      alert(res.message);
      console.log(res, "Ответ при создании мероприятия");
    })
    .catch(err => {
      alert(err);
      console.log(err, "Ошибка при создании мероприятия");
    })
    setShowModal(false);
  }

  return (
    <div className='modal-content'>
        <button className="close-modal" onClick={() => setShowModal(false)}>X</button>
        <h2>Добавление нового события</h2>
        <hr style={{width: "100%"}}/>

        <h3>Дата события</h3>
        <DatePicker onChange={(e: TypeEvent) => {
          if(e?.$d){
            setDate(e.$d);
          }
        }}/>

        <h3>Гости</h3>
        <button className="event-btn" style={{width: "70%"}} onClick={() => setShowList(!showList)}>Выбрать гостей</button>
        <div className={showList?'user-menu show':'user-menu'}>
          <ul className='user-menu__list'>
            {
              selectedUsers.map(user => 
                <li 
                  className={user.select ? 'user-menu__list__item selected' : 'user-menu__list__item'}
                  key={user.email}
                  onClick={() => {
                      user.select = true;
                      setSelectedUsers([...selectedUsers]);
                    }
                  } 
                  >
                    {user.email}
                    <button
                      className='user-menu__list__item-btn' 
                      onClick={(e) => {
                        e.stopPropagation(); // чтобы не срабатывал обработчик лишки
                        user.select = false;
                        setSelectedUsers([...selectedUsers]);
                      }}
                    >
                      x
                    </button>
                  </li>
              )
            }
          </ul>
          <div style={{display: "flex", justifyContent: "space-around"}}>
          <button 
          className="event-btn" 
          style={{width: "50%", margin: "0 auto"}} 
          onClick={() =>
            setSelectedUsers(selectedUsers.map(user => {
              user.select = true;
              return user;
            }))
          }
          >Выбрать всех</button>
            <button className="event-btn" style={{width: "40%", margin: "0 auto"}} onClick={() => setShowList(!showList)}>Готово</button>
            <button className='close-modal' style={{margin: 0}} onClick={() => setShowList(!showList)}>x</button>
          </div>
        </div>
        

        <h3>Описание события</h3>
        <input type="text" className='event-inp' style={{fontSize: 20, width: "65%"}} onChange={e => setDescription(e.target.value)}/>
        <button className="event-btn" style={{width: "70%"}} onClick={addEvent}>Добавить</button>
    </div>
  )
}

export default EventForm
