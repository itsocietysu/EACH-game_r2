import React, { Component } from 'react';
import styled from 'styled-components/native';
import Image from 'react-native-remote-svg';
import {withNavigation} from "react-navigation";

const ContainerView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

class ProfileScreen extends Component {
  render() {
    const userData = this.props.navigation.state.params;

    return (
      <ContainerView>
        <Image
          source={{uri: userData.avatar}}
          fadeDuration={0}
          style={{width: 100, height: 100}}
        />
      </ContainerView>
    );
  }
}

export default (withNavigation)(ProfileScreen);
