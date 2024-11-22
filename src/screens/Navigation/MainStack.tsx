import React from 'react';
import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';
import Routes from '../../constants/routes';
import LoginSuccess from '../LoginSuccess/LoginSuccess';
import LoginStack from './LoginStack';
import Home from '../Home';
import Checkout from '../Checkout/Checkout';

const MainStack = ({ navigation }: any) => {
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
                name={Routes.HOME}
                component={Home}
            />
            <stack.Screen
                options={{
                    animationEnabled: false,
                }}
                name={Routes.CHECKOUT}
                component={Checkout}
            />
            <stack.Screen
                options={{
                    animationEnabled: false,
                }}
                name={Routes.LOGIN_SUCCESS}
                component={LoginSuccess}
            />
            <stack.Screen
                options={{
                    animationEnabled: false,
                }}
                name={Routes.LOGIN_STACK}
                component={LoginStack}
            />
        </stack.Navigator>
    );
};
export default MainStack;
