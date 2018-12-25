import React, { Component } from 'react';
import styled from 'styled-components/native';
import Image from 'react-native-remote-svg';
import { Button } from "react-native";
import {withNavigation} from "react-navigation";

const ContainerView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

class ProfileScreen extends Component {
  render() {
    const avatar = this.props.navigation.state.params.avatar;

    return (
      <ContainerView>
        <Image
          source={{uri: avatar}}
          fadeDuration={0}
          style={{width: 100, height: 100}}
        />
        <Button title="go home"
                onPress={() => {this.props.navigation.navigate('Feeds')}}/>
      </ContainerView>
    );
  }
}

export default (withNavigation)(ProfileScreen);
