import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Button(props: any) {
  return (
    <TouchableOpacity style={styles.button} onPress={props.handlePress}>
        <Text style={{textAlign: 'center', fontWeight: '500'}}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 20,
        backgroundColor: '#FE8C00',
        borderRadius: 50
    }
})