import { SecureStore } from "expo";
import request from "./request";
import { requestUrlRevoke } from "../containers/AuthPage/constants";

const deleteUserData = async() => {
  SecureStore.deleteItemAsync('username');
  SecureStore.deleteItemAsync('email');
  SecureStore.deleteItemAsync('image');
  SecureStore.deleteItemAsync('app');
  SecureStore.deleteItemAsync('token');
};

export async function revokeToken(){
  let appToken;
  let appType;

  try {
    appToken = await SecureStore.getItemAsync('token');
    appType = await SecureStore.getItemAsync('app');
  }
  catch (e) {
    console.log("error from secure store");
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
    console.log("request.block");
    const result = await request(requestUrlRevoke, options);
    console.log(result);
    if (result) {
      deleteUserData().then(console.log("user data successfully deleted"));
      return result;
    }
  } catch(e) {
    console.log("error from delete user data");
    return { error: true };
  }
}