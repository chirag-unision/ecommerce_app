import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import routes from '../../constants/routes';
import Button from '../../components/common/Button';
import TextField from '../../components/common/TextField';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';

export default function Login() {
    const [error, setError] = React.useState('');
	const [loading, setLoading] = React.useState(false);

    const [mobile, setMobile]= useState('');

    const navigation = useNavigation<NativeStackNavigationProp<any>>(); 

    const handleLoginButton = (mobile: String) => {
    //   navigation.replace(routes.MAIN_STACK);
      navigation.replace(routes.OTP);
      
    };  

  return (
    <View style={styles.container}>
        <View>
            <Text style={[styles.normaltext, styles.heading]}>Login to your account.</Text>
            <Text style={[styles.subline]}>Please sign in to your account</Text>
        </View>
        <View>
            <TextField handleChange={setMobile} title={'Mobile Number'} placeholder={'Enter Mobile Number'} />
            <Text style={styles.error}>{error}</Text>
            <Button handlePress={handleLoginButton} title={'Sign In'} />
            
        </View>
    </View>
  )
}

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
        color: '#FE8C00',
        fontSize: 15,
        fontWeight: "400",
        paddingVertical: 20
    },
    signwith: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    error: {
        color: 'red',
        fontSize: 15,
        width: '100%',
        height: 20
    },
    container: {
        backgroundColor: 'white',
        height: Dimensions.get('screen').height,
        padding: 20
    }

})