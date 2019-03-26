import {SecureStore} from "expo";

export async function fetchUserData(){
    try {
        const username = await SecureStore.getItemAsync('username');
        const email = await SecureStore.getItemAsync('email');
        const image = await SecureStore.getItemAsync('image');
        const app = await SecureStore.getItemAsync('app');
        const token = await SecureStore.getItemAsync('token');
        const gameInfo = JSON.parse(await SecureStore.getItemAsync('gameInfo'));
        const gameTime = await SecureStore.getItemAsync('gameTime');
        if (username === null && email === null && image === null && app === null && token === null && gameInfo === null && gameTime === null)
            return null;
        return { username, email, image, app, token, gameInfo, gameTime };
    } catch (error) {
        return null;
    }
}
