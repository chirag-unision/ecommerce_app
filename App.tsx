/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
} from 'react-native';

import OnBoardingStack from './src/screens/Navigation/OnboardingStack';
import { NavigationContainer } from '@react-navigation/native';
import { getData } from './src/util/storage';
import LoginStack from './src/screens/Navigation/LoginStack';
import HomeStack from './src/screens/Navigation/MainStack';
import { getCurrentUser } from './src/util/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import apis from './src/constants/config';
import config from './src/constants/config';
import Home from './src/screens/Home';
import { Provider } from 'react-redux';
import { store } from './src/store';
import AddAddress from './src/screens/AddAddress/AddAddress';


function App(): React.JSX.Element {
  const [loginStatus, setLoginStatus]= useState(true);
  const [auth, setAuth]= useState(true);
  const [onboarded, setOnboarded]= useState(true);


  useEffect(() => {
    GoogleSignin.configure({
      webClientId: config.WEBCLIENT,
      scopes: ['profile', 'email'],
    });
    
    getData('onboarded').then(resp => {
      if(!resp) {
        setOnboarded(false)
      }
    })
    getData('token').then(resp => {
      if(!resp) {
        setLoginStatus(false)
      } else {
        axios.post(apis.BASE_URL+'auth/validateToken', {
            token: resp
        }).then(response => {
          if(!response.data.status)
          setLoginStatus(false)
        })
      }
    })
    getCurrentUser().then(resp => {
      if(!resp) {
        setAuth(false)
      }
    })
  }, [])

  return (
    <NavigationContainer>
      <Provider store={store}>
      {/* {onboarded ? (loginStatus || auth ? <HomeStack /> : <LoginStack />) : <OnBoardingStack />} */}
        {/* <Home /> */}
        <HomeStack />
        {/* <AddAddress /> */}
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});

export default App;