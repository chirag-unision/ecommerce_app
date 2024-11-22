import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TextField from '../../components/common/TextField'
import Button from '../../components/common/Button'

type Props = {}

const AddAddress = (props: Props) => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={[styles.normaltext, styles.heading]}>Add New Address</Text>
                <Text style={[styles.subline]}>Enter your email address and we’ll send you confirmation code to reset your password</Text>
            </View>
            <View style={{ flex: 1 }}>
                <TextField title={'Address Name'} placeholder={'Enter Email'} handleChange={()=>{}} />
                <TextField title={'Address Line 1'} placeholder={'Enter Email'} handleChange={()=>{}} />
                <TextField title={'Address Line 2'} placeholder={'Enter Email'} handleChange={()=>{}} />
                <TextField title={'Landmark'} placeholder={'Enter Email'} handleChange={()=>{}} />
                <TextField title={'City'} placeholder={'Enter Email'} handleChange={()=>{}} />
                <TextField title={'State'} placeholder={'Enter Email'} handleChange={()=>{}} />
                <Text style={styles.error}>{'error'}</Text>
                <View style={styles.buttonBox}>
                    <Button title={'Continue'} handlePress={()=>{}} />
                </View>

            </View>
        </View>
    )
}

export default AddAddress;

const styles = StyleSheet.create({
    normaltext: {
        color: '#000'
    },
    heading: {
        fontSize: 35,
        fontWeight: "500",
        paddingTop: 30,
        paddingRight: 50
    },
    subline: {
        fontSize: 15,
        paddingVertical: 5,
        paddingBottom: 40,
        color: 'grey'
    },
    orangetext: {
        color: 'orange',
        fontSize: 15,
        fontWeight: "400",
        paddingVertical: 20
    },
    container: {
        backgroundColor: 'white',
        height: '100%',
        padding: 20
    },
    buttonBox: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
    },
    error: {
        color: 'red',
        fontSize: 15,
        width: '100%',
        height: 20
    },

})