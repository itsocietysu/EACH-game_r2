import {SecureStore} from "expo";
import request from "./request";
import storeUserData from "./storeUserData";
import {showMessage} from "react-native-flash-message";
import messages from "../Messages";
import {FormattedMessage} from "react-native-globalize";
import React from "react";
import {backend_api_url} from "./constants";

export async function updateStatistics(gameId, stepPassed){
    const body = {
        game_id: gameId,
        step_passed: stepPassed,
    };
    const requestUrl = `${backend_api_url}/each/statistic/update`;
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
        // alert('done update ' + stepPassed);
        return requestResult[0];
    }
    catch (e) {
        if (e === '401')
            msg = <FormattedMessage message={'Unauthorized'}/>;
        else msg = <FormattedMessage message={'ErrStat'}/>;
        showMessage({
            message: msg,
            type: "danger",
        });
        console.log(e);
    }
}