import React, {Component} from 'react';
import {View, Text} from 'react-native';

class ErrorMessage extends Component{

    render(){
        return(
            <View style={{flex: 1}}>
                <Text>Oops, something went wrong</Text>
                <Text>A team of highly trained monkeys has been dispatched to deal with this situation</Text>
                <Text>{this.props.message}</Text>
            </View>
        );
    }
}

export default ErrorMessage;


