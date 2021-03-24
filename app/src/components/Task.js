import React from 'react'
import { FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { View, Text, Pressable, StyleSheet } from 'react-native'

const Task = ({ task, onDelete, onToggle }) => {
    const styles = StyleSheet.create({
        h3: {
            fontSize: 19,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: "90%"
        },
        task: {
            backgroundColor: '#f4f4f4',
            margin: 5,
            paddingVertical: 10,
            paddingHorizontal: 20
        },
        taskReminder: {
            backgroundColor: '#f4f4f4',
            margin: 5,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderLeftWidth: 5,
            borderLeftColor: 'green'
        },
        icon: {
            color: "red",
        },
        taskHeader: {
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        }
    })
    
    let taskStyle = 0
    if(task.reminder) {
        taskStyle = styles.taskReminder
    } else {
        taskStyle = styles.task
    }

    return (
        <Pressable style={taskStyle} onLongPress={() => onToggle(task.id)}>
            <View style={styles.taskHeader}>
                <Text style={styles.h3}>
                    {task.text}
                </Text>
                <Pressable onPress={() => onDelete(task.id)}><FontAwesomeIcon style={styles.icon} icon={ faTimes }></FontAwesomeIcon></Pressable>
            </View>
            <Text>{task.day}</Text>
        </Pressable>
    )
}

export default Task

// onLongPress={onToggle}
// onPress={() => onDelete(task.id)}