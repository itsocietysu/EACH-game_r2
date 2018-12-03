import React, { Component } from 'react';
import {
    StyleSheet,
    ImageBackground,
    View,
    Text
} from 'react-native'
import { AuthSession } from 'expo';
import EachIcon from "../../components/icons/EachIcon";
import GoogleIcon from "../../components/icons/GoogleIcon";
import VkontakteIcon from "../../components/icons/VkontakteIcon";
import {googleAuthUrl, eachAuthUrl, vkontakteAuthUrl} from "../../containers/AuthPage/constants";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      redirectCode: '',
    };
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
          source={require('./../../../assets/images/logo.png')}
          style={styles.logoContainer}>
          <Text>Sign in</Text>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <GoogleIcon size={65}
                        onPress={() => {this.getCodeByAuthUrl(googleAuthUrl).then(code => this.setState({redirectCode: code}));}}/>
            <EachIcon size={65}
                        onPress={() => {this.getCodeByAuthUrl(eachAuthUrl).then(code => this.setState({redirectCode: code}));}}/>
            <VkontakteIcon size={65}
                        onPress={() => {this.getCodeByAuthUrl(vkontakteAuthUrl).then(code => this.setState({redirectCode: code}));}}/>
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

