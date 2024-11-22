import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Routes from '../../constants/routes';
import OnBoardingFirst from '../Onboarding/First';
import OnBoardingSecond from '../Onboarding/Second';
import OnBoardingThird from '../Onboarding/Third';
import LoginStack from './LoginStack';

const OnBoardingStack = ({navigation}: any) => {
  const stack = createStackNavigator();

  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <stack.Screen
        name={Routes.ON_BOARD_SCREEN_1}
        component={OnBoardingFirst}
      />
      <stack.Screen
        name={Routes.ON_BOARD_SCREEN_2}
        component={OnBoardingSecond}
      />
      <stack.Screen
        name={Routes.ON_BOARD_SCREEN_3}
        component={OnBoardingThird}
      />
      <stack.Screen
        name={Routes.LOGIN_STACK}
        component={LoginStack}
      />
    </stack.Navigator>
  );
};
export default OnBoardingStack;
