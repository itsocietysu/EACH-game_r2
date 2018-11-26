import React, { Component } from 'react';
import {
    StyleSheet,
    ImageBackground,
    View,
    Text
} from 'react-native'
import Expo from 'expo';
import GoogleIcon from "../components/icons/GoogleIcon";

class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.signInWithGoogleAsync = this.signInWithGoogleAsync.bind(this);
  }

  async signInWithGoogleAsync() {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: '190923403189-okt67qc41faj5erpk6d55u9ucrrb87hg.apps.googleusercontent.com',
        // iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        console.log(result);
        return result.accessToken;
      } else {
        return {cancelled: true};
      }
    } catch(e) {
      return {error: true};
    }
  }
  /* not for google it should works
  async signInWithGoogleAsync(googleWebAppId) {
    try {
      const redirectUrl = Expo.AuthSession.getRedirectUrl();// 'https://exp.host/@leins275/each-react-native-app';
      const result = await Expo.AuthSession.startAsync({
        authUrl:
          `https://accounts.google.com/o/oauth2/v2/auth?` +
          `&client_id=${googleWebAppId}` +
          `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
          `&response_type=code` +
          `&access_type=offline` +
          `&scope=${encodeURIComponent(['profile','email'].join(' '))}`,
        // returnUrl: 'exp://exp.host/@leins275/each-react-native-app', // Expo.AuthSession.getDefaultReturnUrl(),
      });
      console.log(redirectUrl);
      console.log(result);
      if (result.type === 'success')
        return result.params.code;
      return { cancelled: true };
    } catch (e) {
      return { error: true };
    }
  }
  */

  render() {
    return (
      <View style={styles.wrapper}>
        <ImageBackground
          source={require('./../../assets/images/logo.png')}
          style={styles.logoContainer}>
          <Text>Sign in</Text>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <GoogleIcon size={65}
                        onPress={() => {this.signInWithGoogleAsync().then(token => console.log(token));}}/>
          </View>
          <Text>{`DON'T HAVE AN ACCOUNT YET?`}</Text>
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

