/* eslint-disable guard-for-in, no-restricted-syntax */
import React, { Component } from 'react';
import {
    StyleSheet,
    ImageBackground,
    View,
    Image,
    Button,
    Text
} from 'react-native'
import { AuthSession } from 'expo';
import EachIcon from "../components/icons/EachIcon";
import GoogleIcon from "../components/icons/GoogleIcon";
import VkontakteIcon from "../components/icons/VkontakteIcon";
import {googleAuthUrl, eachAuthUrl, vkontakteAuthUrl, redirectUrl} from "../containers/AuthPage/constants";
import request from './../utils/request';

const buildFormData = data => {
  const formArr = [];

  for (const name in data) {
    const val = data[name];
    if (val !== undefined && val !== '') {
      formArr.push(
        [name, '=', encodeURIComponent(val).replace(/%20/g, '+')].join(''),
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
      App: ''
    };
  }

  async getUserInfo(Code, App, RedirectUrl) {
    const form = {
      code: Code,
      app: App,
      redirectUrl: RedirectUrl,
    };
    const requestURL = [`http://each.itsociety.su:4201/each/OAuth/token/get`, buildFormData(form)].join('?');
    try {
      const result = await request(requestURL);
      if (result) {
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
      if (result.type === 'success')
        return result.params.code;
      return { cancelled: true };
    } catch (e) {
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
            <Button title="USER"
                    onPress={() => {this.getUserInfo(this.state.redirectCode, this.state.App, redirectUrl).then(
              (user) => this.setState({username: user.name, email: user.email, image: user.image})) }}>Show user info </Button>
          </View>
          <Text>{`DON'T HAVE AN ACCOUNT YET? ${this.state.redirectCode}`}</Text>
          <Text> user: ${this.state.username}  </Text>
          <Text> user: ${this.state.username}  </Text>
          <Image source = {this.state.image}/>
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

