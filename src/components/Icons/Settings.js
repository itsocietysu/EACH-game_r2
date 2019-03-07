import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

import {colors} from '../../utils/constants';

const IconRightContainer = styled.TouchableOpacity`
  height: 100%;
  paddingRight: 15;
  justifyContent: center;
`;

const SettingsIcon = ({ onPress }) => (
  <IconRightContainer onPress={onPress}>
    <Ionicons name="md-settings" size={25} color={colors.MAIN} />
  </IconRightContainer>
);

export default SettingsIcon;
