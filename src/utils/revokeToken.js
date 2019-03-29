import { SecureStore } from "expo";
import request from "./request";
import { requestUrlRevoke } from "../configs/authConfig";

export const deleteUserData = async() => {
  SecureStore.deleteItemAsync('username');
  SecureStore.deleteItemAsync('email');
  SecureStore.deleteItemAsync('image');
  SecureStore.deleteItemAsync('app');
  SecureStore.deleteItemAsync('token');
  SecureStore.deleteItemAsync('gameInfo');
  SecureStore.deleteItemAsync('gameTime');
};

export async function revokeToken(){
    try {
        const appToken = await SecureStore.getItemAsync('token');
        const appType = await SecureStore.getItemAsync('app');
        const options = {
            method: 'POST',
            headers: {
                authorization: `Bearer ${appToken} ${appType}`
            },
            body: JSON.stringify({
                access_token: appToken,
                type: appType
            })
        };
        await request(requestUrlRevoke, options);
    }
    catch(e) {
        console.log(e);
        return null;
    }
    finally {
        deleteUserData().then(console.log("user data successfully deleted"));
    }
}