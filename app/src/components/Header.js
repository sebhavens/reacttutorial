import React from 'react'
import {  Text, View, StyleSheet } from 'react-native'
import Button from './Button'

const newHeader = ({ title, onAdd, showAdd}) => {
    const styles = StyleSheet.create({
        h1: {
            fontSize: 32,
            alignItems: 'center',
            justifyContent: 'center',
        },
        header: {
             //flex: 1, 
            // flexDirection: "row",
            // margin: 10,
            // justifyContent: "center",
            // alignItems: "flex-start"
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            //margin: 20,
            marginTop: 20,
            marginBottom: 10
        },
        button: {
            marginRight: 0
        }
    })
    
    return (
        <View style={styles.header}>
            <Text style={styles.h1}>{title}</Text>
            <View style={styles.button}><Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd}></Button></View>
        </View>
    )
}

export default newHeader
