/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import styled from "styled-components/native";
import {View, Text, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
export const TextContainer = styled.View`
    flex: 1
    paddingLeft: ${width*0.03} 
    paddingRight: ${width*0.03}
    paddingBottom: 5px
`;

export const TittleText = styled.Text`
    color: ${props=>props.color}
    fontSize: 20px
    fontWeight: bold
    textAlign: center
`;

export const DescriptionText = styled.Text`
    color: ${props=>props.color}
    fontSize: 18px
    textAlign: justify
`;

export const BasicText = styled.Text`
    color: ${props=>props.color}
    fontSize: 16px
`;

export const ButtonText = styled.Text`
    color: ${props=>props.color}
    fontStyle: italic
    fontWeight: bold
    fontSize: 16px 
`;

export const StyledButton = styled.View`
    backgroundColor: ${props => props.color}
    height: 50px
    width: ${width/2}
    alignItems: center
    justifyContent: center
`;

export const AnswerText = styled.Text`
    fontSize: 20px
    paddingLeft: 10px
    textAlign: center
    color: ${props => props.color}
`;

export const AnswerContainer = styled.View`
    flex: 1
    flexDirection: row
    backgroundColor: ${props => props.color}
    borderWidth: 1
    borderColor: ${'#ffa366'}
    height: 50px
    width: ${width*7/8}
    justifyContent: center
    alignItems: center
`;

export const CentroidFigure = styled.View`
    justifyContent: center
    alignItems: center
`;

export class SpamHello extends React.Component {
    render() {
        return (
            <View>
                <Text>Hell_START</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hell</Text>
                <Text>Hell</Text>
                <Text>Hell_FINISH</Text>
            </View>
        );
    }
}