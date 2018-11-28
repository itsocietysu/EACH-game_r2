import React, { Component } from 'react';
import {
    StyleSheet,
    ImageBackground,
    View,
    Text
} from 'react-native'
import { AuthSession } from 'expo';
import EachIcon from "../components/icons/EachIcon";
import GoogleIcon from "../components/icons/GoogleIcon";
import VkontakteIcon from "../components/icons/VkontakteIcon";

const googleClientId = '190923403189-srp0gleu6imvtph8gcauf03uhb66q65h.apps.googleusercontent.com';
const eachClientId = 'Gu2SCEBUwQV3TSlNIu8uMzvKRMYuGP5ePh044jGErO6O9RR0';
const vkontakteClientId = '6682398';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirectCode: '',
    };
    this.signInWithGoogleAsync = this.signInWithGoogleAsync.bind(this);
  }

  async signInWithGoogleAsync() {
    try {
      const redirectUrl = AuthSession.getRedirectUrl();
      const result = await AuthSession.startAsync({
        authUrl:
          `https://accounts.google.com/o/oauth2/auth?` +
          `&client_id=${encodeURIComponent(googleClientId)}` +
          `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
          `&response_type=code` +
          `&scope=${encodeURIComponent(['profile','email'].join(' '))}`,
      });
      if (result.type === 'success')
        return result.params.code;
      return { cancelled: true };
    } catch (e) {
      return { error: true };
    }
  }

  async signInWithEachAsync() {
    try {
      const redirectUrl = AuthSession.getRedirectUrl();
      const result = await AuthSession.startAsync({
        authUrl:
          `http://each.itsociety.su:5000/oauth2/authorize?` +
          `&client_id=${encodeURIComponent(eachClientId)}` +
          `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
          `&response_type=code` +
          `&scope=${encodeURIComponent(['email'].join(' '))}`,
      });
      if (result.type === 'success')
        return result.params.code;
      return { cancelled: true };
    } catch (e) {
      return { error: true };
    }
  }

  async signInWithVkontakteAsync() {
    try {
      const redirectUrl = AuthSession.getRedirectUrl();
      console.log(redirectUrl);
      const result = await AuthSession.startAsync({
        authUrl:
          `https://oauth.vk.com/authorize?` +
          `&client_id=${encodeURIComponent(vkontakteClientId)}` +
          `v=${encodeURIComponent("5.85")}` +
          `display=mobile` +
          `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
          `&response_type=code` +
          `&scope=${encodeURIComponent(['offline','email'].join(' '))}`,
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
                        onPress={() => {this.signInWithGoogleAsync().then(code => this.setState({redirectCode: code}));}}/>
            <EachIcon size={65}
                        onPress={() => {this.signInWithEachAsync().then(code => this.setState({redirectCode: code}));}}/>
            <VkontakteIcon size={65}
                        onPress={() => {this.signInWithVkontakteAsync().then(code => this.setState({redirectCode: code}));}}/>
          </View>
          <Text>{`DON'T HAVE AN ACCOUNT YET? ${this.state.redirectCode}`}</Text>
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

