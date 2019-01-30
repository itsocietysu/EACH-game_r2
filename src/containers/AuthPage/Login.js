/* eslint-disable guard-for-in, no-restricted-syntax */
import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native'
import { AuthSession, SecureStore } from 'expo';

import connect from "react-redux/es/connect/connect";
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {makeSelectTheme} from "../../components/Theme/selectors";
import {colors, fonts} from "../../utils/constants";

import buildFormData from '../../utils/buildFormData'
import EachIcon from "../../components/icons/EachIcon";
import GoogleIcon from "../../components/icons/GoogleIcon";
import VkontakteIcon from "../../components/icons/VkontakteIcon";
import {googleAuthUrl, eachAuthUrl, vkontakteAuthUrl, redirectUrl, requestUrlGet} from "./constants";
import request from '../../utils/request';
import messages from '../../Messages';
import { makeSelectLanguage } from "../../components/Locales/selectors";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      image: '',
      app: '',
      token: '',
      gameInfo: '',
      gameTime: '',
    };

    this._storeUserData =this._storeUserData.bind(this);
    this._fetchUserData =this._fetchUserData.bind(this);
    this._getUserInfo = this._getUserInfo.bind(this);
  }

  componentDidMount() {
    this._fetchUserData().then((data) => {
      if (data !== undefined) {
        this.props.navigation.navigate('Profile', { userData: data });
      }
    });
  }

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
      console.log(result);
      if (result) {
        this.setState({username: result.name, image: result.image, token: result.access_token, app: App, gameTime: result.time_in_game, gameInfo: result.run});
        this._storeUserData().then(this.props.navigation.navigate('Profile', { userData: result }));
        return result;
      }
    } catch(e) {
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
      return { error: true };
    }
  };

  _storeUserData = async() => {
    try {
      SecureStore.setItemAsync('username', this.state.username);
      SecureStore.setItemAsync('email', this.state.email);
      SecureStore.setItemAsync('image', this.state.image);
      SecureStore.setItemAsync('app', this.state.app);
      SecureStore.setItemAsync('token', this.state.token);
      SecureStore.setItemAsync('gameInfo', JSON.stringify(this.state.gameInfo));
      SecureStore.setItemAsync('gameTime', this.state.gameTime);

    } catch (e) {
      return { error: true };
    }
  };

  _fetchUserData = async () => {
    try {
      const username1 = await SecureStore.getItemAsync('username');
      const email1 = await SecureStore.getItemAsync('email');
      const image1 = await SecureStore.getItemAsync('image');
      const app1 = await SecureStore.getItemAsync('app');
      const token1 = await SecureStore.getItemAsync('token');
      const gameInfo1 = await SecureStore.getItemAsync('gameInfo');
      const gameTime1 = await SecureStore.getItemAsync('gameTime');

      if (email1 !== null && username1 !== null && image1 !== null && app1 !== null && token1 !== null && gameInfo1 !== null && gameTime1 !== null) {
        this.setState({username: username1, email: email1, image: image1, app: app1, token: token1, gameInfo: gameInfo1, gameTime: gameTime1});
        return {username: username1, image: image1, app: app1, token: token1, gameInfo: gameInfo1, gameTime: gameTime1};
      }
    } catch (error) {
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
  return {}
}

const mapStateToProps = createStructuredSelector({
  theme: makeSelectTheme(),
  language: makeSelectLanguage(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(LoginScreen);


