import {AuthSession} from "expo";
import {showMessage} from "react-native-flash-message";
import {FormattedMessage} from "react-native-globalize";
import React from "react";

export const getCodeByAuthUrl = async(url) => {
    try {
        const result = await AuthSession.startAsync({
            authUrl: url,
        });
        if (result.type === 'success') {
            AuthSession.dismiss();
            return {code: result.params.code};
        }
        return { cancelled: true };
    } catch (e) {
        showMessage({
            message: <FormattedMessage message={'ErrService'}/>,
            type: "danger",
        });
        return { error: true };
    }
};
