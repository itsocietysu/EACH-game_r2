/* eslint-disable guard-for-in, no-restricted-syntax */
import React, { Component } from 'react';
import {
    StyleSheet,
    ImageBackground,
    View,
    Button,
    Text,
} from 'react-native'
import { AuthSession, SecureStore } from 'expo';
import EachIcon from "../components/icons/EachIcon";
import GoogleIcon from "../components/icons/GoogleIcon";
import VkontakteIcon from "../components/icons/VkontakteIcon";
import {googleAuthUrl, eachAuthUrl, vkontakteAuthUrl, redirectUrl, requestUrlGet, requestUrlRevoke} from "../containers/AuthPage/constants";
import request from './../utils/request';

const buildFormData = data => {
  const formArr = [];

  for (const name in data) {
    const val = data[name];
    if (val !== undefined && val !== '') {
      formArr.push(
        [name, '=', val].join(''),
      );
    }
  }
  return formArr.join('&');
};

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      image: '',
      redirectCode: '',
      App: '',
      token: '',
    };

    this._storeUserData =this._storeUserData.bind(this);
    this._fetchUserData =this._fetchUserData.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.revokeToken = this.revokeToken.bind(this);
  }

  componentDidMount() {
    this._fetchUserData().then((res)=> console.log(res));
  }

  /*
  componentWillUnmount() {
    this._storeUserData().then();
  }
  */

  async getUserInfo(Code, App, RedirectUrl) {
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

    const requestURL = [requestUrlGet, buildFormData(form)].join('?');
    try {
      const result = await request(requestURL, options);
      if (result) {
        this.setState({username: result.name, email: result.email, image: result.image, token: result.access_token});
        this._storeUserData().then((e)=>{console.log(e);});
        return result;
      }
    } catch(e) {
      return { error: true };
    }
  }

  async getCodeByAuthUrl(url) {
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
  }

  _storeUserData = async() => {
    try {
      SecureStore.setItemAsync('username', this.state.username);
      SecureStore.setItemAsync('email', this.state.email);
      SecureStore.setItemAsync('image', this.state.image);
      SecureStore.setItemAsync('App', this.state.App);
      SecureStore.setItemAsync('token', this.state.token);

    } catch (e) {
      return { error: true };
    }
  };

  _fetchUserData = async () => {
    try {
      const username1 = await SecureStore.getItemAsync('username');
      const email1 = await SecureStore.getItemAsync('email');
      const image1 = await SecureStore.getItemAsync('image');
      const App1 = await SecureStore.getItemAsync('App');
      const token1 = await SecureStore.getItemAsync('token');

      if (email1 !== null && username1 !== null && image1 !== null && App1 !== null && token1 !== null) {
        this.setState({username: username1, email: email1, image: image1, App: App1, token: token1})
      }
    } catch (error) {
      return { error: true };
    }
  };


  _deleteUserData = async() => {
    SecureStore.deleteItemAsync('username');
    SecureStore.deleteItemAsync('email');
    SecureStore.deleteItemAsync('image');
    SecureStore.deleteItemAsync('App');
    SecureStore.deleteItemAsync('token');
  };

  async revokeToken(appToken, appType) {
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
        this._deleteUserData().then();
        return result;
      }
    } catch(e) {
      return { error: true };
    }
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <ImageBackground
          source={require('./../../assets/images/logo.png')}
          style={styles.logoContainer}>
          <Text>Sign in</Text>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <GoogleIcon size={65}
                        onPress={() => {this.getCodeByAuthUrl(googleAuthUrl).then(code => this.setState({redirectCode: code, App: "google"}));}}/>
            <EachIcon size={65}
                        onPress={() => {this.getCodeByAuthUrl(eachAuthUrl).then(code => this.setState({redirectCode: code, App: "each"}));}}/>
            <VkontakteIcon size={65}
                        onPress={() => {this.getCodeByAuthUrl(vkontakteAuthUrl).then(code => this.setState({redirectCode: code, App: "vkontakte"}));}}/>
          </View>
          <Button title="get token and user info"
                  style={styles.button}
                  onPress={() => {this.getUserInfo(this.state.redirectCode, this.state.App, redirectUrl).then((res)=>{console.log(res);}) }}/>
          <Button title="revoke token"
                  style={styles.button}
                  onPress={() => {this.revokeToken(this.state.token, this.state.App).then()}}/>
          <Button title="go home"
                  style={styles.button}
                  onPress={() => {this.props.navigation.navigate('Feeds')}}/>
          <Text>{`DON'T HAVE AN ACCOUNT YET? ${this.state.redirectCode}`}</Text>
          <Text>{`user: ${this.state.username}`}</Text>
          <Text>{`email: ${this.state.email}`}</Text>
          <Text style={{ color: '#0000ff' }}>{`Sign up`}</Text>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    wrapper:{
        flex: 1,
    },
    logoContainer:{
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container:{
        flex: 1,
        justifyContent: 'flex-end',
        paddingLeft: 40,
        paddingRight: 40,
    },
    textInput:{
        alignSelf: 'stretch',
        padding: 16,
        color: 'white',
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'yellow',
        alignSelf: 'stretch',
        padding: 20,
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
    }
});
export default LoginScreen;

