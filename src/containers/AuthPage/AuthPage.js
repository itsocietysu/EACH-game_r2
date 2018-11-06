import React, {Component} from 'react';
import {WebView, View} from 'react-native';


class AuthScreen extends Component{
    render(){
        const {navigation} = this.props;
        const url = navigation.getParam('url', '');
        console.log(url);
        return(
            <View style={{flex:1}}>
                <WebView
                    source={{uri: url}}/>
            </View>
        );
    }
}
export default AuthScreen;
