import React from 'react';
import { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, View, StyleSheet } from  'react-native';
import Button from './src/components/Button'
import Header from './src/components/Header'
import Tasks from './src/components/Tasks'
import AddTasks from './src/components/AddTasks'
import { setCustomText } from 'react-native-global-props'

const App = () => {
  const customTextProps = {
    style: {
      fontFamily: 'Poppins'
    }
  }
  setCustomText(customTextProps)

  const styles = StyleSheet.create({
    view: {
      flex: 1,
      borderRadius: 5,
      borderWidth: 1,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 40,
      padding: 15,
      borderColor: "steelblue",
      marginBottom: 30
    }
  })
  
  const [showAddTask, setShowAddTask] = useState(false)
  const [showTasks, setShowTasks] = useState(true)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
       const tasksFromServer = await fetchTasks()
       setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  //Fetch tasks
  const fetchTasks = async () => {
    const addr = 'http://178.128.125.243:3000/tasks'
    const res = await fetch(addr)
    const data = await res.json()

    return data
  }

  //Fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`http://178.128.125.243:3000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  //Add Task
  const addTask = async (task) => {
    setShowTasks(true)
    setShowAddTask(!showAddTask)
    const res = await fetch('http://178.128.125.243:3000/tasks',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])
    //const id = Math.floor(Math.random() * 10000) + 1
    //const newTask = { id, ...task }
    //setTasks([...tasks, newTask])
  }

  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://178.128.125.243:3000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    //const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}
    const reminder = !taskToToggle.reminder
    const updReminderSend = JSON.stringify({ reminder })

    const res = await fetch(`http://178.128.125.243:3000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: updReminderSend
    })

    const data = await res.json()

    setTasks(tasks.map((task) => 
      task.id === id ? {...task, reminder: data.reminder} : task)
    )
  }

  const clickNewButton = () => {
    setShowTasks(!showTasks)
    setShowAddTask(!showAddTask)
    if(showTasks) {
      tasksCode = tasks.length > 0 ? ( 
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}></Tasks>
        ) : (
          <Text>No Tasks</Text>
        )
    } else {
      tasksCode = <Text></Text>
    }
  }

  let tasksCode;
  if(showTasks) {
    tasksCode = tasks.length > 0 ? ( 
      <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}></Tasks>
      ) : (
        <Text>No Tasks</Text>
      )
  } else {
    tasksCode = <Text></Text>
  }


  return (
    <SafeAreaView style={styles.view}>
      <Header title="Task Tracker" onAdd={() => clickNewButton()} showAdd={showAddTask}></Header>
      {showAddTask && <AddTasks onAdd={addTask}></AddTasks> }
      {/* {tasks.length > 0 ? ( 
          <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}></Tasks>
          ) : (
            <Text>No Tasks</Text>
          )} */}
          {tasksCode}
    </SafeAreaView>
  );
}

export default App;