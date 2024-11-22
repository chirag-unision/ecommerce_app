import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { useNavigation } from '@react-navigation/native';
import routes from '../../constants/routes';
import Button from '../../components/common/Button';
import axios from 'axios';
import apis from '../../constants/config';
import OneMinuteTimer from '../../components/login/Timer';
import Clock from '../../assets/clock';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';

export default function Otp({route}:any) {
    const [error, setError] = useState('');
    const [code, setCode]= useState('');
    const [resend, setResend]= useState(false);
    const { pid, email } = route.params;
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const onPressHandlerContinue = (uid: String) => {
      navigation.replace(routes.RESET, {uid});
    }; 
    console.log('pid: '+pid);
    const handleOtpVerification = () => {
        if(code!='') {
            axios.post(apis.BASE_URL+'auth/verifyOtp', {
                pid: pid,
                otp: code
            })
            .then(response => {
                console.log(response.data.message);
                onPressHandlerContinue(response.data.user.uid)
            })
            .catch(error => {
                console.log(error);
                setError(error.response.data.message);
            })
        } 
    }
    const handleResendOtp = () => {
        if(resend) {
            axios.post(apis.BASE_URL+'auth/sendOtp', {
                email: email.toLowerCase()
            })
            .then(response => {
                console.log(response.data.message);
                setResend(false);
            })
            .catch(error => {
                console.log(error);
                setError(error.response.data.message);
            })
        } 
    }

    const handleTimer = () => {
        setResend(true);
        console.log('Yayy')
    }


  return (
    <View style={styles.container}>
        <View>
            <Text style={[styles.normaltext, styles.heading]}>Email Verification</Text>
            <Text style={[styles.subline]}>Enter the verification code we send you on: {email.substring(0,6)+'*****'+email.substring(11)}</Text>
        </View>
        <View style={{flex: 1}}>
            <View>
            <OTPInputView
                style={{width: '80%', marginHorizontal: '10%', height: 100}}
                pinCount={4}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled = {(code => {
                    setCode(code);
                    console.log(`Code is ${code}, you are good to go!`)
                })}
            />
            </View>
            <Text style={styles.error}>{error}</Text>
            <View style={styles.signwith}>
                <Text style={styles.normaltext}>Didn't receive code? </Text>
                <Pressable onPress={handleResendOtp}>
                    <Text style={styles.orangetext}>Resend</Text>
                </Pressable>
            </View>

            {!resend && <View  style={styles.signwith}>
                <Clock />
                <OneMinuteTimer onTimeUp={handleTimer} />
            </View>}
            <View style={styles.buttonBox}>
                <Button title={'Continue'} handlePress={handleOtpVerification} />
            </View>
            
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
        color: 'orange',
        fontSize: 15,
        fontWeight: "400",
        paddingVertical: 20
    },
    inputbox: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 20,
        paddingHorizontal: 10
    },
    dash: {
        width: '30%',
        height: 2,
        backgroundColor: 'grey'
    },
    signwith: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20
    },
    container: {
        backgroundColor: 'white',
        height: '100%',
        padding: 20
    },
    textInputContainer: {
        marginBottom: 20,
    },
    roundedTextInput: {
        borderRadius: 10,
        borderWidth: 4,
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



      borderStyleBase: {
        width: 30,
        height: 45
      },
    
      borderStyleHighLighted: {
        borderColor: "#03DAC6",
      },
    
      underlineStyleBase: {
        width: 60,
        height: 65,
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 20,
        color: '#000'
      },
    
      underlineStyleHighLighted: {
        borderColor: "#000",
      }

})