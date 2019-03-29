import {requestUrlGet} from "../configs/authConfig";
import buildFormData from "./buildFormData";
import request from "./request";
import storeUserData from "./storeUserData";
import {showMessage} from "react-native-flash-message";
import {FormattedMessage} from "react-native-globalize";
import React from "react";

export const getUserDataByCode = async(Code, App, RedirectUrl) => {
    const form = {
        redirect_uri: RedirectUrl,
        code: Code,
        type: App,
    };
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    };

    const requestURL = [requestUrlGet, buildFormData(form)].join('&');
    try {
        const result = await request(requestURL, options);
        if (result) {
            result.type = App;
            storeUserData(result).then(console.log("user data saved successfully"));
            delete result.type;
            delete result.token;
            delete result.email;
            return result;
        }
    } catch(e) {
        showMessage({
            message: <FormattedMessage message={'ErrLogin'}/>,
            type: "danger",
        });
        return null;
    }
};
