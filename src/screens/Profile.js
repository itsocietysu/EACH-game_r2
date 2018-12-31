import React, { Component } from 'react';
import Image from 'react-native-remote-svg';
import {withNavigation} from "react-navigation";

import  {SecureStore} from 'expo';
import { Text, View } from "react-native";
import { createStructuredSelector } from "reselect";
import connect from "react-redux/es/connect/connect";
import { compose } from "redux";
import { colors, fonts } from "../utils/constants";
import { makeSelectTheme } from "../components/Theme/selectors";
import { tokenInfo } from '../utils/tokenInfo';
import { DataList } from '../components/DataList';
import {PassedQuest} from '../utils/passedQuestComponent'

class ProfileScreen extends Component {
  state = {gameInfo: { bonus: 0, game_passed: [], game_process: []}, gameTime: ''};

  async _onLoad() {
    let gameInfo = await SecureStore.getItemAsync('gameInfo');
    const gameTime = await SecureStore.getItemAsync('time_in_game');
    gameInfo = JSON.parse(gameInfo);
    this.setState({ gameInfo, gameTime });
  }

  render() {
    const userData = this.props.navigation.state.params;
    const theme = this.props.theme;
    const { gameInfo, gameTime } = this.state;

    tokenInfo().then(() => this._onLoad());

    const loading = "";
    const error = "";
    const dataListProps = {
      loading,
      error,
      data: JSON.stringify(gameInfo.games_passed),
      Component: PassedQuest,
    };

    return (
      <View
        style={{backgroundColor: colors.BASE[theme],
          alignItems: 'center',
        }}
      >
        <Image
          source={{uri: userData.avatar}}
          fadeDuration={0}
          style={{width: 200,
            height: 200,
            borderWidth: 2,
            borderRadius: 100,
            borderColor: colors.MAIN,
            marginTop: 30,
            flex: 0,
          }}
        />
        <Text style={{color: colors.MAIN, textAlign: 'center', fontSize: 60, fontFamily: fonts.EACH, marginTop: 10}}>
          {userData.name}
        </Text>
        <Text style={{color: colors.TEXT[theme], textAlign: 'center', fontSize: 30, fontFamily: fonts.MURRAY, marginTop: 20}}>
          Hовичок  Баллы: {gameInfo.bonus}
        </Text>
        <Text style={{color: colors.TEXT[theme], textAlign: 'center', fontSize: 30, fontFamily: fonts.MURRAY, marginTop: 10}}>
          Время в игре:  {gameTime}
        </Text>
          <Text style={{color: colors.MAIN,
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
            borderColor: colors.MAIN,
            fontSize: 40,
            fontFamily: fonts.EACH,
            marginTop: 10,
          }}>
            Cыгранные квесты
          </Text>
        <DataList {...dataListProps} />
      </View>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {}
}

const mapStateToProps = createStructuredSelector({
  theme: makeSelectTheme(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withNavigation)(ProfileScreen);
