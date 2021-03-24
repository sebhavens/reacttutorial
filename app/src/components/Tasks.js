import React from 'react'
import { ScrollView, Text } from 'react-native'
import Task from './Task'

const Tasks = ({ tasks, onDelete, onToggle }) => {
    return (
        <ScrollView>
            {tasks.map((task, index) => (
          <Task key={index} task={task} onDelete={onDelete} onToggle={onToggle}></Task>
          ))}  
        </ScrollView>
    )
}

export default Tasks
