/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import styled from "styled-components/native";
import {View, Text, Dimensions} from 'react-native';
import {colors} from "../utils/constants";

const width = Dimensions.get('window').width;
export const TextContainer = styled.View`
    flex: 1
    paddingLeft: ${width*0.03} 
    paddingRight: ${width*0.03}
    paddingBottom: 5px
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
    borderColor: ${colors.SECOND.light}
    height: 50px
    width: ${width*7/8}
    justifyContent: center
    alignItems: center
`;

export const CentroidFigure = styled.View`
    justifyContent: center
    alignItems: center
`;

export const TittleText = styled.Text`
    color: ${props=> props.color}
    fontFamily: ${props=> props.font}
    fontSize: 15
    fontWeight: bold 
`;

export const TittleContainer = styled.View`
    flex: 1
    paddingLeft: 5
    justifyContent: center
`;

export const LogoAvatar = styled.Image`
    width: 40
    height: 40
    borderRadius: 20
    borderWidth: 1
    borderColor: ${props => props.borderColor}   
`;

export const HeaderContainer = styled.View`
    flex: 0.15
    flexDirection: row
    backgroundColor: ${props => props.bgColor}
    paddingLeft: 4
    paddingBottom: 4
    paddingTop: 2
    paddingRight: 2
`;

export const ImageMask = styled.View`
    position: absolute
    backgroundColor: rgba(160,160,160,0.5)
    height: ${props => props.height}
    width: ${props => props.width}
`;

export const MainTextContainer = styled.View`
    flex: 1
    backgroundColor: ${props => props.bgColor}
    width: ${props => props.width || '100%'}
    height: ${props => props.height || '100%'}
    paddingLeft: 4
    paddingBottom: 10
`;

export const MainText = styled.Text`
    color: ${props=> props.color}
    fontFamily: ${props=> props.font}
`;

export const MoreText = styled.Text`
    alignSelf: center
    color: #0000ff
    fontFamily: ${props=> props.font}
`;

export const Rectangle = styled.View`
    width: ${props => props.width}
    height: ${props => props.height}
    backgroundColor:  ${props=> props.backgroundColor || 'transparent'}
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