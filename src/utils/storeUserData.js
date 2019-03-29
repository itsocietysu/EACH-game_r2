import {SecureStore} from "expo";

export default async function storeUserData(data){
    try {
        SecureStore.setItemAsync('token', data.access_token);
        SecureStore.setItemAsync('app', data.type);
        SecureStore.setItemAsync('email', data.email);
    }
    catch (e) {
        console.log(e);
    }
}
