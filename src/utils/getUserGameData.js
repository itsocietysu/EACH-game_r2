import {SecureStore} from "expo";

export default async function getUserGameData(){
    return {
        username: await SecureStore.getItemAsync('username'),
        gameData: await SecureStore.getItemAsync('gameInfo').then(data => JSON.parse(data)),
        timeInGame: await SecureStore.getItemAsync('gameTime'),
    }
}
