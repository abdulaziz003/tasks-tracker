import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About';


function App() {
  const [tasks, setTasks]= useState([]);
  const [showAddTask, setShowAddTask]= useState(false);

  // fetch all tasks from the server
  const fetchTasks = async ()=>{
    const res = await fetch('http://localhost:5550/tasks');
    const data = await res.json();
    return data;
  }

  // fetch only one task with id
  const fetchTask = async (id)=>{
    const res = await fetch(`http://localhost:5550/tasks/${id}`);
    const data = await res.json();
    return data;
  }

  const mountTasksToState = async ()=>{
    const tasksFromServer = await fetchTasks();
    setTasks(tasksFromServer);
  }

  useEffect(() => {
    mountTasksToState()
  }, [])

  const addTask = async (task)=>{
    const res = await fetch('http://localhost:5550/tasks',{
      method: 'POST',
      headers:{
        'Content-type': 'application/json'
      },
      body:JSON.stringify(task)
    });

    const newTask = await res.json();

    setTasks([...tasks,newTask]);
  }

  const deleteTask = async (id)=>{
    await fetch(`http://localhost:5550/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter(task=> task.id != id));
  }

  // toggle remainder class
  const toggleReminder = async (id)=>{
    const toUpdateTask = await fetchTask(id);
    const updatedTask = {...toUpdateTask, reminder:!toUpdateTask.reminder};

    const res = await fetch(`http://localhost:5550/tasks/${id}`, {
      method:'PUT',
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const serverUpdatedTask = await res.json();


    setTasks(tasks.map(task=> task.id === id ? {...task, reminder: serverUpdatedTask.reminder}: task));
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
