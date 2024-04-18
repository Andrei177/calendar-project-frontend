import { FC, useState } from 'react'
import EventCalendar from '../components/EventCalendar'
import EventForm from '../components/EventForm'

const Event: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  
  return (
    <div>
      <EventCalendar events={[]}/>
      <div className='wrap-btn'>
        <button className='event-btn' onClick={() => setShowModal(true)}>Добавить событие</button>
      </div>
      <div className={showModal ? "modal visible" : "modal"}>
       <EventForm setShowModal={setShowModal}/>
      </div>
    </div>
  )
}

export default Event
