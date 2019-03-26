import {SecureStore} from "expo";
import {showMessage} from "react-native-flash-message";
import request from "./request";
import messages from "../Messages";
import {FormattedMessage} from "react-native-globalize";
import React from "react";
import {backend_api_url} from "./constants";

export async function updateFeedback(id, weight, comment){
    const body = {
        id,
        text: comment,
        weight,
    };
    const requestUrl = `${backend_api_url}/each/game/rating`;
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
        // alert(requestResult.text);
        // alert('done feedback update');
        return true;
    }
    catch (e) {
        showMessage({
            message: <FormattedMessage message={'ErrFeed'}/>,
            type: "danger",
        });
        console.log(e);
        return false;
    }
}
