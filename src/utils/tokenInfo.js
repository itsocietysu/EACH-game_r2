import {SecureStore} from "expo";
import request from "./request";
import buildFormData from "./buildFormData";
import storeUserData from "./storeUserData";

export async function tokenInfo(){
    try{
        const token = await SecureStore.getItemAsync('token');
        const authType = await SecureStore.getItemAsync('app');
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/x-www-form-urlencoded',
                authorization: `Bearer ${token} ${authType}`,
            },
        };
        const requestTokenInfo = 'http://eachdev.itsociety.su:4201/each/token/info';
        const requestParams = {
            access_token: token,
            type: authType,
            expansion: true,
        };
        const requestUrl = [requestTokenInfo, buildFormData(requestParams)].join('?');
        const requestResult = await request(requestUrl, options);

        await storeUserData(requestResult);
        alert(token);
        alert(requestResult.name);
    }
    catch(e){
        console.log(e);
        alert(e);
        return {error: true};
    }
}
