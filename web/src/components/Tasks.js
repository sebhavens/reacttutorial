import Task from './Task'

const Tasks = ({ tasks, onDelete, onToggle }) => {
    return (
        <>
          {tasks.map((task, index) => (
          <Task key={index} task={task} style={{cursor: 'default'}} onDelete={onDelete} onToggle={onToggle}></Task>
          ))}  
        </>
    )
}

export default Tasks
