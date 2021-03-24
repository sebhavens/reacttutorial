import React from 'react'
import { View, StyleSheet, Button, TouchableOpacity, Text } from 'react-native'

const newButton = ({ onClick, text, color }) => {
    const styles = StyleSheet.create({
        button: {
            backgroundColor: color,
            color: "#fff",
            borderRadius: 5,
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 10,
            paddingRight: 10,
            margin: 5,
            borderWidth: 0,
            fontSize: 15,
            textAlign: 'center'
        }
    })
    return (
        <TouchableOpacity onPress={onClick} style={styles.button}>
            <Text style={styles.button}>{text}</Text>
        </TouchableOpacity>
    )
}

export default newButton