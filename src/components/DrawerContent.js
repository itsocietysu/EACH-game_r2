import React from 'react';
import { DrawerItems } from 'react-navigation';
import styled from 'styled-components/native';

import Button from './Button';

const ContainerView = styled.View`
  flex: 1;
`;

const DrawerContainer = styled.View`
  flex: 8;
`;

const AvatarContainer = styled.View`
  flex: 4;
  top: 30;
  alignItems: center;
  justifyContent: center;
`;

const Avatar = styled.View`
  width: 120;
  height: 120;
  borderRadius: 60;
  backgroundColor: ${props => props.theme.PINK_100};
`;

const ItemContainer = styled.View`
  flex: 6;
`;

const ButtonContainer = styled.View`
  flex: 2;
  justifyContent: center;
  alignItems: center;
`;

const DrawerContent = (props) => (
  <ContainerView>
    <DrawerContainer>
      <AvatarContainer>
        <Avatar />
      </AvatarContainer>

    </DrawerContainer>
    <ButtonContainer>
      <Button text="Logout" onPress={() => props.navigation.navigate('Login')} />
    </ButtonContainer>
  </ContainerView>
);

export default DrawerContent;