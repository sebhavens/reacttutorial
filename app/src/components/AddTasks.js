import React from 'react'
import { useState } from 'react'
import { ScrollView, View, Text, TextInput, StyleSheet } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import Button from './Button'

const AddTasks = ({onAdd}) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = () => {
        //e.preventDefault()

        if(!text) {
            alert('Please add a task')
            return
        }

        onAdd({ text, day, reminder })

        setText('')
        setDay('')
        setReminder(false)
    }

    const styles = StyleSheet.create({
        form: {
            marginBottom: 40
        },
        formControl: {
            marginVertical: 5,
            marginHorizontal: 0
        },
        formControlInput: {
            height: 40,
            margin: 5,
            paddingVertical: 3,
            paddingHorizontal: 7,
            fontSize: 17,
            borderWidth: 1,
            borderRadius: 4
        },
        formControlCheck: {
            marginVertical: 5,
            marginHorizontal: 0,
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            //margin: 20,
            marginTop: 20,
            marginBottom: 10
        },
        formControlCheckLabel: {
            flex: 1,
            alignItems: 'flex-start'
        },
        formControlCheckInput: {
            alignItems: 'flex-end',
            color: 'black'
        }
    })
    

    return (
        <ScrollView style={styles.form}>
            <View style={styles.formControl}>
                <Text>Task</Text>
                <TextInput style={styles.formControlInput} placeholder="Add Task" defaultValue={text} onChangeText={text => setText(text)}></TextInput>
            </View>
            <View style={styles.formControl}>
                <Text>Day & Time</Text>
                <TextInput style={styles.formControlInput} placeholder="Add Day & Time" defaultValue={day} onChangeText={text => setDay(text)}></TextInput>
            </View>
            <View style={styles.formControlCheck}>
                <Text style={styles.formControlCheckLabel}>Set Reminder</Text>
                <BouncyCheckbox iconStyle={{borderColor: 'black'}} size={25} fillColor="blue"  style={styles.formControlCheckInput} isChecked={reminder} onPress={(isChecked) => {setReminder(isChecked)}}></BouncyCheckbox>
            </View>
            <Button text="Submit" color="black" onClick={onSubmit}></Button>
        </ScrollView>
    )
}

export default AddTasks
