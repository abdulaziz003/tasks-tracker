import {useState} from 'react'

const AddTask = ({addTask}) => {
  const [text, setText]= useState('');
  const [date, setDate]= useState('');
  const [reminder, setReminder]= useState(false);


  const handleSubmit = (e)=>{
    e.preventDefault()
    if(!text){
      alert('الرجاء اضافة مهمة');
      return
    }
    // addTask({id: Date.now().toString(), text, day:date, reminder});
    // we removed the id because the json-server package will add id for us
    addTask({text, day:date, reminder});
    setDate('')
    setText('')
    setReminder(false)
  }


  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="">مهمة جديدة</label>
        <input type="text" placeholder="اضف مهمة جديدة" value={text} onChange={(e)=> setText(e.target.value)}/>
      </div>
      <div className="form-control">
        <label htmlFor="">التاريخ والوقت</label>
        <input type="text" placeholder="التاريخ والوقت" value={date} onChange={(e)=> setDate(e.target.value)}/>
      </div>
      <div className="form-control form-control-check">
        <label htmlFor="">تذكير على المهمة</label>
        <input type="checkbox" value={reminder} checked={reminder} onChange={(e)=> setReminder(e.currentTarget.checked)}/>
      </div>

      <input type="submit" value="اضف لقائمة المهام" className="btn btn-block"/>
    </form>
  )
}

export default AddTask
