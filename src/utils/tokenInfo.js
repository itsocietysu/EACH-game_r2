import {SecureStore} from "expo";
import request from "./request";
import buildFormData from "./buildFormData";
import storeUserData from "./storeUserData";
import {backend_api_url} from "./constants";

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
        const requestTokenInfo = `${backend_api_url}/each/token/info`;
        const requestParams = {
            access_token: token,
            type: authType,
            expansion: true,
        };
        const requestUrl = [requestTokenInfo, buildFormData(requestParams)].join('?');
        const requestResult = await request(requestUrl, options);

        await storeUserData(requestResult);
        return requestResult;
        // alert(token);
        // alert(requestResult.name);
    }
    catch(e){
        console.log(e);
        return null;
    }
}
