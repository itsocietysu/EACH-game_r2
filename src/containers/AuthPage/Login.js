/* eslint-disable guard-for-in, no-restricted-syntax */
import React, { Component } from 'react';
import {
  View,
  Text,
  AsyncStorage,
    ActivityIndicator,
} from "react-native";
import FlashMessage, {showMessage} from "react-native-flash-message";
import { AuthSession, SecureStore } from 'expo';
import {FormattedMessage} from "react-native-globalize";
import connect from "react-redux/es/connect/connect";
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {makeSelectTheme} from "../../components/Theme/selectors";
import { colors, fonts, storage } from "../../utils/constants";

import buildFormData from '../../utils/buildFormData'
import EachIcon from "../../components/icons/EachIcon";
import GoogleIcon from "../../components/icons/GoogleIcon";
import VkontakteIcon from "../../components/icons/VkontakteIcon";
import {googleAuthUrl, eachAuthUrl, vkontakteAuthUrl, redirectUrl, requestUrlGet} from "./constants";
import request from '../../utils/request';
import messages from '../../Messages';
import { makeSelectLanguage } from "../../components/Locales/selectors";
import { makeSelectAuth } from "../../components/Auth/selectors";
import {changeAuth} from "../../components/Auth/actions";

import storeUserData from '../../utils/storeUserData';
import {deleteUserData} from "../../utils/revokeToken";

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this._getUserInfo = this._getUserInfo.bind(this);
  }

  _authChange = async() => {
      try{
          let auth = await AsyncStorage.getItem(storage.AUTH);
          if (auth === null || auth === undefined || auth === 'false')
              auth = true;
          else
              auth = false;
          AsyncStorage.setItem('AUTH', auth.toString());
          this.props.changeAuth(auth)
      }
      catch(e){
          console.log('Error:: ', e);
      }
  };

  _getUserInfo = async(Code, App, RedirectUrl) => {
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
            await this._authChange();
            const userData = {
              username: result.name,
              image: result.image,
              token: result.access_token,
              app: App,
              gameInfo: result.run,
              gameTime: result.time_in_game
            };
            result.type = App;
            storeUserData(result).then(console.log("user data saved successfully"));
            this.props.navigation.navigate('Profile', {userData});
          return result;
      }
    } catch(e) {
        showMessage({
            message: <FormattedMessage message={'ErrLogin'}/>,
            type: "danger",
        });
        deleteUserData();
        return { error: true };
    }
  };

  _getCodeByAuthUrl = async(url) => {
    try {
      const result = await AuthSession.startAsync({
        authUrl: url,
      });
      if (result.type === 'success') {
        AuthSession.dismiss();
        return result.params.code;
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

  render() {
    const theme = this.props.theme;
    const lang = this.props.language;
      return (
        <View style={{flex: 1, backgroundColor: colors.BASE[theme]}}>
          <Text style={{color: colors.TEXT[theme], textAlign: 'center', fontSize: 80, fontFamily: fonts.MURRAY, marginTop: 20}}>
            {messages[lang].Enter}
          </Text>
          <Text style={{color: colors.TEXT[theme], textAlign: 'center', fontSize: 30, fontFamily: fonts.MURRAY, marginTop: 80}}>
            {messages[lang].AuthMsg}
          </Text>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <EachIcon size={65}
                      onPress={() => {this._getCodeByAuthUrl(eachAuthUrl).then(code => this._getUserInfo(code, "each", redirectUrl));}}/>
            <VkontakteIcon size={65}
                           onPress={() => {this._getCodeByAuthUrl(vkontakteAuthUrl).then(code => this._getUserInfo(code, "vkontakte", redirectUrl));}}/>
            <GoogleIcon size={65}
                        onPress={() => {this._getCodeByAuthUrl(googleAuthUrl).then(code => this._getUserInfo(code, "google", redirectUrl));}}/>
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
    };
}

const mapStateToProps = createStructuredSelector({
  theme: makeSelectTheme(),
  language: makeSelectLanguage(),
  auth: makeSelectAuth(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(LoginScreen);


