import { SecureStore } from "expo";
import request from "./request";
import { requestUrlRevoke } from "../containers/AuthPage/constants";

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
  let appToken;
  let appType;

  try {
    appToken = await SecureStore.getItemAsync('token');
    appType = await SecureStore.getItemAsync('app');
  }
  catch (e) {
    return {error: true}
  }

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


  try {
    const result = await request(requestUrlRevoke, options);
    if (result) {
      deleteUserData().then(console.log("user data successfully deleted"));
      return result;
    }
  } catch(e) {
    console.log(e)
    return { error: e };
  }
}