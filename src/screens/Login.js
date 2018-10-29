import React, { Component } from 'react';
import { connect } from 'react-redux';
import {FormattedWrapper, FormattedMessage} from "react-native-globalize";
import * as Progress from 'react-native-progress';
import {
    KeyboardAvoidingView,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    View,
    ActivityIndicator,
    Text,
    TextInput,
    AsyncStorage
} from 'react-native'
import {withNavigation} from 'react-navigation';
import VkontakteIcon from "../components/icons/VkontakteIcon";
import GoogleIcon from "../components/icons/GoogleIcon";
import EachIcon from "../components/icons/EachIcon";
import {VK_URL, EACH_URL, GOOGLE_URL} from "../containers/AuthPage/constants";

/* import messages from "../Messages"; */

class LoginScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }
    /* componentDidMount(){
        this._loadInitialState().done();
    }

    _loadInitialState = async ()=>{
        const value = await AsyncStorage.getItem('user');
        if (value != null){
            this.props.navigation.navigate('Home')
        }
    };*/
    render() {
        return (
            <View style={styles.wrapper}>
                {/* <ImageBackground
                    source = {require('./../../media/main.jpg')}
                    style={styles.logoContainer}>
                    <View style={styles.container}>
                        <TextInput
                            style={styles.textInput}
                            placeholder={'username'}
                            onChangeText={(username) => this.setState({username})}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder={'password'}
                            onChangeText={(password) => this.setState({password})}
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {this.props.navigation.navigate('Home');}}>
                            <Text style={{color: 'white'}}>Log in</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {this.props.navigation.navigate('Home');}}>
                            <Text style={{color: 'white'}}>Continue without registration</Text>
                        </TouchableOpacity>
                        <View style={{alignItems: 'center', marginBottom: 20}}>
                            <Text style={{color: '#ffffff'}}>{`DON'T HAVE AN ACCOUNT YET?`}</Text>
                            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Registration');}}>
                                <Text style={{color: '#0000ff'}}>{`Sign up`}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ImageBackground>*/}
                <ImageBackground
                    source = {require('./../../assets/images/logo.png')}
                    style={styles.logoContainer}>
                    <Text>Sign in</Text>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <VkontakteIcon size={65} onPress={()=>this.props.navigation.navigate('Auth', {url:VK_URL})}/>
                        <GoogleIcon size={65} onPress={()=>this.props.navigation.navigate('Auth', {url:GOOGLE_URL})}/>
                        <EachIcon size={65} onPress={()=>this.props.navigation.navigate('Auth', {url:EACH_URL})}/>
                    </View>
                    <Text>{`DON'T HAVE AN ACCOUNT YET?`}</Text>
                    <Text style={{color: '#0000ff'}}>{`Sign up`}</Text>
                </ImageBackground>
            </View>
        );
    }
}

login = () => {
    alert('test')
};

const mapStateToProps = (state) => ({
    curState:state
});

/* export default connect(mapStateToProps, {
})(LoginScreen);*/

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
