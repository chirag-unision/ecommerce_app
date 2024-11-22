import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios from "axios";
import apis from "../constants/config";

export const getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    return currentUser;
};

const mobileCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const handleLogin = (mobile: string, setError: Function) => {
    if(mobile!='') {
        if(mobileCheck.test(mobile))
        axios.post(apis.BASE_URL+'auth/login', {
            mobile: mobile.toLowerCase(),
        })
        .then(response => {
            console.log(response);
            return response.status
            // storeData('user', response.data.user.mobile).then(()=>{
            //     storeData('token', response.data.token).then(()=> {
            //         onPressHandlerLogin(response.data.user.mobile);
            //     })
            // })
        })
        .catch(error => {
            console.log(error);
            setError(error.response.data.message);
        })
        else
        setError('Invalid Email Address.');
    }   
}