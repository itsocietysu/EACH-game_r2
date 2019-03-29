import {SecureStore} from "expo";

export async function fetchUserData(){
    try {
        const username = await SecureStore.getItemAsync('username');
        const image = await SecureStore.getItemAsync('image');
        const gameInfo = JSON.parse(await SecureStore.getItemAsync('gameInfo'));
        const gameTime = await SecureStore.getItemAsync('gameTime');
        if (username === null && email === null && image === null && app === null && token === null && gameInfo === null && gameTime === null)
            return null;
        return { username, image, gameInfo, gameTime };
    } catch (error) {
        return null;
    }
}
