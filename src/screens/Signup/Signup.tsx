import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import routes from '../../constants/routes';
import Button from '../../components/common/Button';
import TextField from '../../components/common/TextField';
import GoogleLogin from '../../components/login/GoogleLogin';
import axios from 'axios';
import apis from '../../constants/config';
import { storeData } from '../../util/storage';
import Password from '../../components/common/Password';
import CheckBox from 'react-native-check-box';
import { setCalendar } from '../../util/auth';

export default function Signup() {
    const [error, setError] = useState('');
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [username, setUsername]= useState('');
    const [check, setCheck]= useState(false);

    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const emailCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const onPressHandlerLogin = () => {
      navigation.replace(routes.LOGIN);
    }; 

    const onPressHandlerSignup = (email: String) => {
      setCalendar(email);
      navigation.replace(routes.MAIN_STACK);
    }; 

    const handleSignup = () => {
        if(username!='' && email!='' && password!='' && check) {
            if(emailCheck.test(email))
            axios.post(apis.BASE_URL+'auth/signup', {
                email: email.toLowerCase(),
                username: username,
                password: password
            })
            .then(response => {
                console.log(response);
                storeData('user', response.data.newUser.email).then(()=>{
                    storeData('token', response.data.token).then(()=> {
                        onPressHandlerSignup(response.data.newUser.email);
                    })
                })
            })
            .catch(error => {
                console.log(error);
                setError(error.response.data.message);
            })
            else
            setError('Invalid Email Address.');
        }   
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={[styles.text, styles.heading]}>Create your new account.</Text>
                <Text style={[styles.subline]}>Create an account to start looking for the food you like</Text>
            </View>
            <View>
                <TextField title={'Email Address'} placeholder={'Enter Email'} handleChange={setEmail} />
                <TextField title={'User Name'} placeholder={'Enter Username'} handleChange={setUsername} />
                <Password title={'Password'} placeholder={'Enter Password'} handleChange={setPassword} />
                <View style={styles.checkbox}>
                    <CheckBox
                        style={{ paddingRight: 10 }}
                        onClick={()=>{
                            setCheck(!check)
                        }}
                        isChecked={check}
                        checkedCheckBoxColor={'#FE8C00'}
                    />
                    <Text style={[styles.text]}>
                        I Agree with 
                        <Text style={styles.orangetext}> Terms of Service </Text> 
                        and 
                        <Text style={styles.orangetext}> Privacy Policy </Text>
                    </Text>
                </View>
                <Text style={styles.error}>{error}</Text>
                <Button handlePress={handleSignup} title={'Register'} />
                <GoogleLogin />
                <View>
                    <Pressable onPress={onPressHandlerLogin} style={styles.signwith}>
                        <Text style={styles.text}>Have an account? </Text>
                        <Text style={styles.orangetext}>Sign In</Text>
                    </Pressable>
                </View>
                
            </View>
        </View>
      )
    }
    
    const styles = StyleSheet.create({
        text: {
            color: '#000',
            fontSize: 15,
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
            // paddingVertical: 20,
        },
        signwith: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 20
        },
        checkbox: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginTop: -20,
            paddingVertical: 20,
            paddingHorizontal: 10
        },
        error: {
            color: 'red',
            fontSize: 15,
            width: '100%',
            height: 20,
            marginBottom: 10
        },
        container: {
            backgroundColor: 'white',
            height: Dimensions.get('screen').height,
            padding: 20
        },
    
    })