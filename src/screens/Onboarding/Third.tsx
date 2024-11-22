import {useNavigation} from '@react-navigation/native';
import {
  Text,
  StyleSheet,
  Pressable,
  View,
  Image,
  Dimensions,
} from 'react-native';
import Routes from '../../constants/routes';
import React, { useState } from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import ArrowRight from '../../assets/arrow_right';
import { storeData } from '../../util/storage';

const OnBoardingThird = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const onPressHandler = () => {
    storeData('onboarded', '1');
    navigation.replace(Routes.LOGIN_STACK);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/bg1.png')}
        style={{
          width: '100%',
          height: Dimensions.get('window').height,
          position: 'absolute',
          zIndex: -10
        }}
      />
      <View style={styles.secondContainer}>
        <Text style={styles.text}>We serve incomparable delicacies</Text>
        <Text style={styles.subline}>All the best restaurants with their top menu waiting for you, they cant’t wait for your order!!</Text>
        <View style={styles.dashview}>
          <View style={[styles.dash, {backgroundColor: '#C2C2C2'}]}></View>
          <View style={[styles.dash, {backgroundColor: '#C2C2C2'}]}></View>
          <View style={[styles.dash, {backgroundColor: 'white'}]}></View>
        </View>
        <View style={{alignItems: 'center', marginTop: 20}}>
        <View style={[{flexDirection: 'row', justifyContent: 'center', width: '100%', position: 'absolute', zIndex:10, bottom: 15}]}>
          <Pressable onPress={onPressHandler}>
            <View style={styles.fbutton}>
              <ArrowRight color={'#FE8C00'} />
            </View>
          </Pressable>
        </View>
        <CircularProgress
          value={100}
          radius={50}
          progressValueColor={'#fff'}
          activeStrokeColor={'#fff'}
          inActiveStrokeColor={'#fff'}
          inActiveStrokeOpacity={0.2}
          activeStrokeWidth={2}
          inActiveStrokeWidth={2}
        />
        </View>
      </View>
    </View>
  );
};

export default OnBoardingThird;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1B1B',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: '100%'
  },
  secondContainer: {
    position: 'absolute',
    backgroundColor: '#FE8C00',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '10%',
    width: 280,
    height: 400,
    borderRadius: 50,
    bottom: 40
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 25,
    color: 'white'
  },
  subline: {
    fontSize: 13,
    paddingVertical: 10,
    color: 'white',
    textAlign: 'center'

  },
  dashview: {
    flexDirection: 'row',
    marginTop: 10
  },
  dash: {
    width: 25,
    height: 6,
    borderRadius: 10,
    margin: 2
  },
  fbutton: {
    width: 70,
    height: 70,
    backgroundColor: 'white',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black'
  }
});