import {SecureStore} from "expo";

export async function fetchAuthData(){
    try {
        const email = await SecureStore.getItemAsync('email');
        const app = await SecureStore.getItemAsync('app');
        const token = await SecureStore.getItemAsync('token');
        if (email === null && app === null && token === null)
            return null;
        return { email, app, token };
    } catch (error) {
        return null;
    }
}