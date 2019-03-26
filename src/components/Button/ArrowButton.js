import React, { Component } from 'react';
import {View, TouchableOpacity} from 'react-native';
import { withTheme } from 'styled-components';
import styled from 'styled-components/native';

const ButtonContainer = styled.View`
  backgroundColor: ${props => props.bgColor}
  borderColor: ${props => props.borderColor}
  borderWidth: 2
  width: ${props => props.width || '60%'}
  height: ${props => props.height || '40%'}
  justifyContent: center
  alignItems: center
`;

const Text = styled.Text`
  fontSize: 20;
  color: ${'#000'}
`;

class ArrowButton extends Component {
    render() {
        const { bgColor, borderColor, onPress, width, height } = this.props;

        return (
            <TouchableOpacity onPress={onPress}>
                <ButtonContainer bgColor={bgColor} borderColor={borderColor} width={width} height={height}>
                    {this.props.children}
                </ButtonContainer>
            </TouchableOpacity>
        );
    }
}

export default withTheme(ArrowButton);
