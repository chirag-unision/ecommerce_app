import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

export default function TextField(props: any) {
  return (
    <View>
        <Text style={styles.normalText}>{props.title}</Text>
        <TextInput 
        style={styles.inputbox} 
        placeholder={props.placeholder} 
        placeholderTextColor={'grey'} 
        onChangeText={props.handleChange} 
        />
    </View>
  )
}

const styles = StyleSheet.create({
    normalText: {
        color: '#000'
    },
    inputbox: {
        borderColor: '#EDEDED',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 20,
        paddingHorizontal: 10,
        color: '#000'
    },
})