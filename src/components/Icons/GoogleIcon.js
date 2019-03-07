import React from 'react';
import styled from 'styled-components/native';
import Image from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const IconLeftContainer = styled.TouchableOpacity`
  height: 100%;
  paddingLeft: 15;
  justifyContent: center;
`;

const GoogleIcon = ({ onPress, size=25 }) => (
  <IconLeftContainer onPress={onPress}>
      <Image
          source={require('../../../assets/icons/logo-google.png')}
          fadeDuration={0}
          style={{width: size, height: size}}
      />
  </IconLeftContainer>
);

export default GoogleIcon;