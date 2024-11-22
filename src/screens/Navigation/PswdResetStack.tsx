import React from 'react';
import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';
import Routes from '../../constants/routes';
import Forget from '../ForgetPassword/Forget';
import Reset from '../ForgetPassword/Reset';
import Otp from '../ForgetPassword/Otp';
import LoginStack from './LoginStack';

const PswdResetStack = ({ navigation }: any) => {
    const stack = createStackNavigator();

    return (
        <stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}>
            <stack.Screen
                options={{
                    animationEnabled: false,
                }}
                name={Routes.FORGET}
                component={Forget}
            />
            <stack.Screen
                options={{
                    animationEnabled: false,
                }}
                name={Routes.OTP}
                component={Otp}
            />
            <stack.Screen
                options={{
                    animationEnabled: false,
                }}
                name={Routes.RESET}
                component={Reset}
            />
        </stack.Navigator>
    );
};
export default PswdResetStack;
