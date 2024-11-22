import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import GoogleIcon from '../../assets/google_logo';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { storeData } from '../../util/storage';
import { useNavigation } from '@react-navigation/native';
import routes from '../../constants/routes';
import { setCalendar } from '../../util/auth';

export default function GoogleLogin() {

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const onPressHandlerLogin = (email: String) => {
      setCalendar(email);
      navigation.replace(routes.MAIN_STACK);
    }; 

    const GoogleLogin = async () => {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        return userInfo;
    };

    const handleGoogleLogin = async () => {
		try {
			const response = await GoogleLogin();
			const { idToken, user } = response;

			if (idToken) {
                storeData('Gtoken', idToken);
                storeData('user', user.email);
                onPressHandlerLogin(user.email);
				// const resp = await authAPI.validateToken({
				// 	token: idToken,
				// 	email: user.email,
				// });
				// await handlePostLoginData(resp.data);
			}

		} catch (apiError) {
            console.log(apiError.message || 'Something went wrong');
		} finally {
			//
		}
	};

    return (
        <View>
            <View style={styles.signwith}>
                <View style={styles.dash}></View>
                <Text style={styles.normalText}>Or sign in with</Text>
                <View style={styles.dash}></View>
            </View>
            <Pressable onPress={handleGoogleLogin}>
                <GoogleIcon width={60} height={80} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    normalText: {
        color: '#000'
    },
    dash: {
        width: '30%',
        height: 2,
        backgroundColor: '#EDEDED'
    },
    signwith: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 20,
    }
})