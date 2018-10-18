import styled from "styled-components/native";
import {View, Text} from 'react-native';

export const TextContainer = styled.View`
    flex: 1
    alignItems: ${({ align }) => align || 'center'};
`;

export const TittleText = styled.Text`
    color: 'rgb(255,255,255)'
    flex: 1
    fontSize: 20px
    fontWeight: bold
`;

export const DescriptionText = styled.Text`
    color: 'rgb(255,255,255)'
    fontSize: 14px
    flex: 1
`;

export const BasicText = styled.Text`
    color: 'rgb(0,0,0)'
    fontSize: 14px
    flex: 1
`;
