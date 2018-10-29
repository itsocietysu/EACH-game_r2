import React from 'react';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';

const IconLeftContainer = styled.TouchableOpacity`
  height: 100%;
  paddingLeft: 15;
  justifyContent: center;
`;

const GoogleIcon = ({ onPress, size=25 }) => (
    <IconLeftContainer onPress={onPress}>
        <FontAwesome name="google-plus-square" size={size} color={'rgb(219,68,55)'} />
    </IconLeftContainer>
);

export default GoogleIcon;
