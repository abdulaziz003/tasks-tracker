import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About';

const data = {
  "tasks": [
    {
      "id": 1,
      "text": "موعد للطبيب",
      "day": "الأحد ١٩ ربيع أول ١١:٣٠ صباحاً",
      "reminder": true
    },
    {
      "id": 2,
      "text": "اجتماع بالمدرسة",
      "day": "الاربعاء ٢٣ ربيع أول ٩:٣٠ صباحاً",
      "reminder": true
    },
    {
      "id": 3,
      "text": "مشتريات للمطبخ",
      "day": "الجمعة ٢٦ ربيع أول ٤:٣٠ مساءً",
      "reminder": false
    }
  ]
}


function App() {
  const [tasks, setTasks]= useState(data.tasks);
  const [showAddTask, setShowAddTask]= useState(false);


  const addTask = async (task)=>{
    setTasks([...tasks,task]);
  }

  const deleteTask = async (id)=>{
    setTasks(tasks.filter(task=> task.id != id));
  }

  // toggle remainder class
  const toggleReminder = async (id)=>{
    setTasks(tasks.map(task=> task.id === id ? {...task, reminder: !task.reminder}: task));
  }





  return (
    <Router>
      <div className="container">
        <Header setShowAddTask={()=>setShowAddTask(!showAddTask)} showAddTask={showAddTask}/>
        <Route path="/" exact render={(props)=>(
          <>
            {showAddTask && <AddTask addTask={addTask}/>}
            {tasks.length ? <Tasks tasks={tasks} deleteTask={deleteTask} toggleReminder={toggleReminder}/> : <p>لا يوجد مهام 🙃</p>}

          </>
        )}/>
        <Route path='/about' component={About}/>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
