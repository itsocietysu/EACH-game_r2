import styled from "styled-components/native";
import {View, Text, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
export const TextContainer = styled.View`
    flex: 1
    paddingLeft: ${width*0.03} 
    paddingRight: ${width*0.03}
`;

export const TittleText = styled.Text`
    color: 'rgb(255,255,255)'
    flex: 1
    fontSize: 20px
    fontWeight: bold
    textAlign: center
`;

export const DescriptionText = styled.Text`
    color: 'rgb(255,255,255)'
    fontSize: 14px
    flex: 1
    textAlign: justify
`;

export const BasicText = styled.Text`
    color: 'rgb(0,0,0)'
    fontSize: 14px
    flex: 1
`;
