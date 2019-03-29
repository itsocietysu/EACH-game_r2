/* eslint-disable guard-for-in, no-restricted-syntax */
import React, { Component } from 'react';
import {
    View,
    Text,
    AsyncStorage,
    TouchableOpacity,
} from "react-native";
import connect from "react-redux/es/connect/connect";
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {makeSelectTheme} from "../../redux/selectors/themeSelectors";
import { colors, fonts, storage} from "../../utils/constants";

import EachIcon from "../../components/Icons/EachIcon";
import GoogleIcon from "../../components/Icons/GoogleIcon";
import VkontakteIcon from "../../components/Icons/VkontakteIcon";
import {googleAuthUrl, eachAuthUrl, vkontakteAuthUrl, redirectUrl} from "../../configs/authConfig";
import messages from '../../Messages';
import { makeSelectLanguage } from "../../redux/selectors/localesSelectors";
import { makeSelectAuth } from "../../redux/selectors/authSelectors";
import {changeAuth} from "../../redux/actions/authActions";

import {SettingsAddText} from "../styles";
import {getCodeByAuthUrl} from "../../utils/getAuthCode";
import {getUserDataByCode} from "../../utils/getUserDataByCode";
import {loadUserData} from "../../redux/actions/userDataActions";
import {openBugReportGoogleForm} from "../../utils/openBugReportGoogleForm";

class LoginScreen extends Component {

    _authChange = async() => {
        try{
            let auth = await AsyncStorage.getItem(storage.AUTH, false);
            auth = (auth === null || auth === undefined || auth === 'false');
            AsyncStorage.setItem(storage.AUTH, auth.toString());
            this.props.changeAuth(auth)
        }
        catch(e){
            console.log('Error:: ', e);
        }
    };

    async _authWithService(url, app, redirectUrl){
        const result = await getCodeByAuthUrl(url);
        if (!result.error){
            const data = await getUserDataByCode(result.code, app, redirectUrl);
            if (!data) {
                console.log("WARNING: User data wasn't saved to the static storage!");
                return;
            }
            this.props.updateUserData(data);
            this.props.changeAuth(true);
            console.log('Authorization completed');
            this.props.navigation.navigate('AuthProvider')
        }
    }

    render() {
        const theme = this.props.theme;
        const lang = this.props.language;
        return (
            <View style={{flex: 1, backgroundColor: colors.BASE[theme]}}>
                <View style={{padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity
                        onPress={openBugReportGoogleForm}
                    >
                        <SettingsAddText color={'#f00'} font={fonts.MURRAY}>
                            <Text>Нашли баг? Заполните google-форму</Text>
                        </SettingsAddText>
                    </TouchableOpacity>
                </View>
                <Text style={{color: colors.TEXT[theme], textAlign: 'center', fontSize: 80, fontFamily: fonts.MURRAY, marginTop: 20}}>
                    {messages[lang].Enter}
                </Text>
                <Text style={{color: colors.TEXT[theme], textAlign: 'center', fontSize: 30, fontFamily: fonts.MURRAY, marginTop: 80}}>
                    {messages[lang].AuthMsg}
                </Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                    <EachIcon size={65}
                              onPress={() => {this._authWithService(eachAuthUrl, "each", redirectUrl);}}/>
                    <VkontakteIcon size={65}
                                   onPress={() => {this._authWithService(vkontakteAuthUrl, "vkontakte", redirectUrl);}}/>
                    <GoogleIcon size={65}
                                onPress={() => {this._authWithService(googleAuthUrl, "google", redirectUrl);}}/>
                </View>

            </View>
        );
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        changeAuth: evt => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(changeAuth(evt));
        },
        updateUserData: evt => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(loadUserData(evt));
        },
    };
}

const mapStateToProps = createStructuredSelector({
    theme: makeSelectTheme(),
    language: makeSelectLanguage(),
    auth: makeSelectAuth(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(LoginScreen);


