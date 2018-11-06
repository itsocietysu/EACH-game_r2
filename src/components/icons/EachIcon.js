import React, {Component} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import styled from "styled-components/native";

const IconLeftContainer = styled.TouchableOpacity`
  height: 100%;
  paddingLeft: 15;
  justifyContent: center;
`;

const EachIcon = ({onPress, size}) => (
    <IconLeftContainer onPress={onPress}>
        <Image
            source={require('../../../assets/icons/map_icon_128.png')}
            fadeDuration={0}
            style={{width: size, height: size}}
        />
    </IconLeftContainer>
);

export default EachIcon;
