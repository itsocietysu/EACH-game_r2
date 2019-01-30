import React, {Component} from 'react';
import {View, Text} from 'react-native';

class ErrorMessage extends Component{

    render(){
        return(
            <View style={{flex: 1}}>
                <Text>Something went wrong</Text>
                <Text>{this.props.message}</Text>
            </View>
        );
    }
}

export default ErrorMessage;


