import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {AnswerContainer, AnswerText} from "../containers/styles";
import {colors} from "../utils/constants";

export default class PickerItem extends Component {

    render(){
        const text = this.props.text;
        const theme = this.props.theme;
        const state = this.props.state;
        const handler = this.props.handler;
        const width = Dimensions.get('window').width;
        const txtColor = state.pickerSelection === text.index ? colors.WHITE :  colors.SECOND[theme];
        const bgColor = state.pickerSelection === text.index ? colors.SECOND[theme] : colors.BASE[theme];
        return(
            <TouchableOpacity onPress={()=>handler(text.index)}>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center', paddingBottom: 10, backgroundColor: colors.BASE[theme]}}>
                    <AnswerContainer color={bgColor} width={width*7/10}>
                        <AnswerText color={txtColor}>{text.item}</AnswerText>
                    </AnswerContainer>
                </View>

            </TouchableOpacity>
        );
    }
}
