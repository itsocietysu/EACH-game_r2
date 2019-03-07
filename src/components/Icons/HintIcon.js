import React from 'react';
import styled from 'styled-components/native';
import {View} from 'react-native';
import { FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons';
import {colors, ICON_SIZE} from "../../utils/constants";

const IconLeftContainer = styled.TouchableOpacity`
  paddingLeft: 5
  justifyContent: flex-end
  alignItems: flex-end
`;

const HintIcon = ({ onPress, size }) => (
    <IconLeftContainer onPress={onPress}>
        <FontAwesome name="question-circle" size={size||ICON_SIZE} color={colors.MAIN} />
    </IconLeftContainer>
);

export default HintIcon;
