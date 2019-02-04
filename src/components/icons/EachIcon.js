import React from 'react';
import Image from 'react-native-remote-svg';
import styled from "styled-components/native";

const IconLeftContainer = styled.TouchableOpacity`
  height: 100%;
  paddingLeft: 15;
  justifyContent: center;
`;

const EachIcon = ({onPress, size}) => (
  <IconLeftContainer onPress={onPress}>
    <Image
      source={require('../../../assets/icons/logo.png')}
      style={{width: size, height: size}}
    />
  </IconLeftContainer>
);

export default EachIcon;