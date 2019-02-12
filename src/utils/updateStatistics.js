import {SecureStore} from "expo";
import request from "./request";
import storeUserData from "./storeUserData";


export async function updateStatistics(gameId, stepPassed){
    const body = {
        game_id: gameId,
        step_passed: stepPassed,
    };
    const requestUrl = `http://each.itsociety.su:4201/each/statistic/update`;
    try {
        const token = await SecureStore.getItemAsync('token');
        const authType = await SecureStore.getItemAsync('app');
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/x-www-form-urlencoded',
                authorization: `Bearer ${token} ${authType}`,
            },
            body: JSON.stringify(body),
        };
        const requestResult = await request(requestUrl, options);
        // await storeUserData(requestResult[0]);
        alert('done update');
        return true;
    }
    catch (e) {
        alert(e);
        alert("update failed");
        console.log(e);
    }
}