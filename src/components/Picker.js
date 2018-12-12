import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {colors, fonts} from "../utils/constants";
import styled from "styled-components/native";
import getFont from "../utils/getFont";

export const AnswerText = styled.Text`
    fontSize: 20px
    paddingLeft: 10px
    textAlign: center
    fontFamily: ${props => props.font}
    color: ${props => props.color}
`;

export const AnswerContainer = styled.View`
    flex: 1
    flexDirection: row
    backgroundColor: ${props => props.color}
    borderWidth: 2
    borderColor: ${colors.SECOND.light}
    height: 50px
    width: ${props => props.width*7/8}
    justifyContent: center
    alignItems: center
`;
export default class PickerItem extends Component {

    render(){
        const text = this.props.text;
        const theme = this.props.theme;
        const fontLoaded = this.props.fontLoaded;
        const state = this.props.state;
        const handler = this.props.handler;
        const width = Dimensions.get('window').width;
        const txtColor = state.pickerSelection === text.index ? colors.WHITE :  colors.SECOND[theme];
        const bgColor = state.pickerSelection === text.index ? colors.SECOND[theme] : colors.BASE[theme];
        return(
            <TouchableOpacity onPress={()=>handler(text.index)}>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center', paddingBottom: 10, backgroundColor: colors.BASE[theme]}}>
                    <AnswerContainer color={bgColor} width={width*0.95}>
                        <AnswerText color={txtColor} font={getFont(fontLoaded, fonts.EACH)}>{text.item}</AnswerText>
                    </AnswerContainer>
                </View>

            </TouchableOpacity>
        );
    }
}
