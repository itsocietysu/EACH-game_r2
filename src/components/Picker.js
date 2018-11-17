import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {AnswerContainer, AnswerText} from "../containers/styles";


export default class PickerItem extends Component{

    render(){
        const text = this.props.text;
        const state = this.props.state;
        const handler = this.props.handler;
        const width = Dimensions.get('window').width;
        const color = state.pickerSelection === text.index ? '#ffffff' : '#000000';
        const bgColor = state.pickerSelection === text.index ? '#ffa366' : '#ffffff';
        return(
            <TouchableOpacity onPress={()=>handler(text.index)}>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center', paddingBottom: 10}}>
                    <AnswerContainer color={bgColor} width={width*7/8}>
                        <AnswerText color={color}>{text.item}</AnswerText>
                    </AnswerContainer>
                </View>

            </TouchableOpacity>
        );
    }
}
