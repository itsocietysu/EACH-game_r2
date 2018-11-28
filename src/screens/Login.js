import React, { Component } from 'react';
import {
    StyleSheet,
    ImageBackground,
    View,
    Text
} from 'react-native'
import { AuthSession } from 'expo';
import EachIcon from "../components/icons/EachIcon";

const eachClientId = 'Gu2SCEBUwQV3TSlNIu8uMzvKRMYuGP5ePh044jGErO6O9RR0';
const eachAuthDomain = 'http://each.itsociety.su:5000/oauth2/authorize';

function toQueryString(params) {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirectCode: '',
    };
    this.signInWithEachAsync = this.signInWithEachAsync.bind(this);
  }

  async signInWithEachAsync() {
    try {
      const redirectUrl = AuthSession.getRedirectUrl();
      console.log(`Redirect URL (add this to Auth0): ${redirectUrl}`);
      const result = await AuthSession.startAsync({
        authUrl: eachAuthDomain + toQueryString({
            client_id: eachClientId,
            response_type: 'code',
            scope: 'email',
            redirect_uri: redirectUrl,
          }),
      });
      console.log(result);
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
            <EachIcon size={65}
                        onPress={() => {this.signInWithEachAsync().then(console => console.log(console));}}/>
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

