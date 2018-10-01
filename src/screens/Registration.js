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
    AsyncStorage,
} from 'react-native'


/*import messages from "../Messages";*/

class Registration extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            username: '',
            birthday: '',
            email: '',
            password: '',
            repeat: '',
            valid: false,
        }
    }
    componentDidMount(){
        this._loadInitialState().done();
    }

    validateEmail = (text) => {
        const reg  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))+$/;
        if (!reg.test(text)) {
            this.setState({email: text});
            alert("Email is Correct");
        }
        else {
            alert("Email is Not Correct");
            this.setState({email: text});
            return false;
        }
        return true;
    };

    _loadInitialState = async ()=>{
        const value = await AsyncStorage.getItem('user');
        if (value != null){
            this.props.navigation.navigate('Home')
        }
    };
    render() {
        return (
            <View style={styles.wrapper}>
                <ImageBackground
                    source = {require('./../../media/main.jpg')}
                    style={styles.logoContainer}>
                    <View style={styles.container}>
                        <TextInput
                        style={styles.textInput}
                        placeholder={'name'}
                        onChangeText={(name) => this.setState({name})}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder={'username'}
                            onChangeText={(password) => this.setState({password})}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder={'birthday'}
                            onChangeText={(birthday) => this.setState({birthday})}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder={'email'}
                            onSubmitEditing={(email) => this.validateEmail(email)}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder={'password'}
                            onChangeText={(password) => this.setState({password})}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder={'repeat password'}
                            onChangeText={(repeat) => this.setState({repeat})}
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.login}>
                            <Text style={{color: 'white'}}>Sign in</Text>
                        </TouchableOpacity>
                    </View>
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

export default connect(mapStateToProps, {
})(Registration);

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
        marginBottom: 20,
    }
});