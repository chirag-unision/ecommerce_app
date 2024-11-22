import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import Eye from '../../assets/eye'

export default function Password(props: any) {
  const [show, setShow]= useState(false);
  const toggleShow = () => {
    setShow(!show);
  }
  return (
    <View>
        <Text style={styles.normalText}>{props.title}</Text>
        <View>
          <TextInput 
          style={styles.inputbox} 
          placeholder={props.placeholder} 
          placeholderTextColor={'grey'} 
          onChangeText={props.handleChange} 
          secureTextEntry={!show}
          />
          <Pressable style={styles.box} onPress={toggleShow}><Eye /></Pressable>
        </View>
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
    box: {
      position: 'absolute',
      right: 15,
      top: 25
    }
})