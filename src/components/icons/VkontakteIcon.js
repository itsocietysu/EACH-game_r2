import React from 'react';
import styled from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';

const IconLeftContainer = styled.TouchableOpacity`
  height: 100%;
  paddingLeft: 15;
  justifyContent: center;
`;

const VkontakteIcon = ({ onPress, size=25 }) => (
    <IconLeftContainer onPress={onPress}>
        <Entypo name="vk-alternitive" size={size} color={'rgb(75,116,165)'} />
    </IconLeftContainer>
);

export default VkontakteIcon;