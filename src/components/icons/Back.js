import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import {colors} from "../../utils/constants";

const IconLeftContainer = styled.TouchableOpacity`
  height: 100%;
  paddingLeft: 15;
  justifyContent: center;
`;

const Back = ({ onPress }) => (
  <IconLeftContainer onPress={onPress}>
    <Ionicons name="md-arrow-back" size={25} color={colors.SECOND.light} />
  </IconLeftContainer>
);

export default Back;
