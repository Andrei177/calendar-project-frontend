import { DatePicker, Select } from 'antd'
import { FC } from 'react'

interface EventFormProps{
    setShowModal: (bool: boolean) => void
}
type TypeEvent={
  $d: Date;
}

const EventForm: FC<EventFormProps> = ({setShowModal}) => {
  return (
    <div className='modal-content'>
        <button className="close-modal" onClick={() => setShowModal(false)}>X</button>
        <h2>Добавление нового события</h2>
        <hr style={{width: "100%"}}/>

        <h3>Дата события</h3>
        <DatePicker onChange={(e: TypeEvent) => console.log(e.$d)}/>

        <h3>Гость</h3>
        <Select defaultValue={"Вася"} style={{width: "70%"}} onChange={(pers) => console.log(pers)}>
            <Select.Option value="Вася">Вася</Select.Option>
            <Select.Option value="Андрей">Андрей</Select.Option>
            <Select.Option value="Александр">Александр</Select.Option>
        </Select>

        <h3>Описание события</h3>
        <input type="text" className='event-inp' style={{fontSize: 20, width: "65%"}}/>
        <button className="event-btn" style={{width: "70%"}}>Добавить</button>
    </div>
  )
}

export default EventForm
