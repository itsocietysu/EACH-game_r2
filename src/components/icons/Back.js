import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import {colors, HeaderPadding, BACK_ICON_SIZE} from "../../utils/constants";

const IconLeftContainer = styled.TouchableOpacity`
  flex: 1;
  paddingLeft: 15;
`;

const Back = ({ onPress }) => (
  <IconLeftContainer onPress={onPress} style={{paddingTop: HeaderPadding}}>
    <Ionicons name="md-arrow-back" size={BACK_ICON_SIZE} color={colors.SECOND.light} />
  </IconLeftContainer>
);

export default Back;
