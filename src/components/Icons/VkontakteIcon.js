import React from 'react';
import styled from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';
import Image from 'react-native';

const IconLeftContainer = styled.TouchableOpacity`
  height: 100%;
  paddingLeft: 15;
  justifyContent: center;
`;

const VkontakteIcon = ({ onPress, size=25 }) => (
  <IconLeftContainer onPress={onPress}>
      <Image
          source={require('../../../assets/icons/logo-vk.png')}
          fadeDuration={0}
          style={{width: size, height: size}}
      />
  </IconLeftContainer>
);

export default VkontakteIcon;
