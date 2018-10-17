import React, { Component } from 'react';
import styled from 'styled-components/native';
import MapView from 'react-native-maps';
import {StyleSheet, View} from 'react-native';

const ContainerView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

const TitleText = styled.Text`
  fontSize: 30;
  color: ${props => props.theme.WHITE};
`;

class FavoritesScreen extends Component {
    render() {
        return (
            <View style={{flex:1, justifyContent: 'flex-end'}}>
                <MapView  style={styles.map}
                          region={{
                              latitude: 60.0074,
                              longitude: 30.3729,
                              latitudeDelta: 0.005,
                              longitudeDelta: 0.005,
                          }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    map:{
        flex: 1,
    }
});
export default FavoritesScreen;
