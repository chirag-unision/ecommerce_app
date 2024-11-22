import React from 'react';
import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';
import Routes from '../../constants/routes';
import Login from '../Login/Login';
import MainStack from './MainStack';
import Otp from '../ForgetPassword/Otp';

const LoginStack = ({ navigation }: any) => {
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
                name={Routes.LOGIN}
                component={Login}
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
                name={Routes.MAIN_STACK}
                component={MainStack}
            />
        </stack.Navigator>
    );
};
export default LoginStack;
