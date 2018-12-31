import {SecureStore} from "expo";

export default function storeUserData(data){
    try {
        // SecureStore.setItemAsync('id', data.id);
        SecureStore.setItemAsync('token', data.access_token);
        SecureStore.setItemAsync('app', data.type);
        SecureStore.setItemAsync('username', data.name);
        SecureStore.setItemAsync('email', data.email);
        // SecureStore.setItemAsync('access_type', data.access_type);
        SecureStore.setItemAsync('image', data.image);
        SecureStore.setItemAsync('gameInfo', JSON.stringify(data.run));
        SecureStore.setItemAsync('time_in_game', data.time_in_game);
    }
    catch (e) {
        console.log(e);
    }
}
