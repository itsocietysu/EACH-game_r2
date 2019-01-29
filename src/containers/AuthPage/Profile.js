import React, { Component } from 'react';
import Image from 'react-native-remote-svg';
import {withNavigation} from "react-navigation";
import PropTypes from "prop-types";

import  {SecureStore} from 'expo';
import { Text, View } from "react-native";
import { createStructuredSelector } from "reselect";
import connect from "react-redux/es/connect/connect";
import { compose } from "redux";
import { colors, fonts } from "../../utils/constants";
import { makeSelectTheme } from "../../components/Theme/selectors";
import { tokenInfo } from '../../utils/tokenInfo';
import DataList from '../../components/DataList';
import RenderQuestItem from './RenderQuestItem';
import { makeSelectLanguage } from "../../components/Locales/selectors";
import messages from '../../Messages';

class ProfileScreen extends Component {
  state = {gameInfo: { bonus: 0, game_passed: [], game_process: []}, gameTime: ''};

  async _onLoad() {
    try {
      let gameInfo = await SecureStore.getItemAsync('gameInfo');
      const gameTime = await SecureStore.getItemAsync('time_in_game');
      gameInfo = JSON.parse(gameInfo);
      this.setState({ gameInfo, gameTime });
    }
    catch(e) {
      return {error: e}
    }
  }

  _ChoseStatus(Score) {
    let res;

    if (Score >= 0 && Score < 1000) res = "Beginner";
    else if (Score >= 1000 && Score < 2000) res =  "Student";
    else if (Score >= 2000 && Score < 3000) res = "Expert";
    else if (Score >= 3000 && Score < 4000) res = "Profi";
    else res = "Master";

    return res;
  }


  render() {
    const userData = this.props.navigation.state.params;
    const theme = this.props.theme;
    const lang = this.props.language;
    const { gameInfo, gameTime } = this.state;
    const loading = false;
    const error = false;
    const range = this._ChoseStatus(gameInfo.bonus);
    tokenInfo().then(() => this._onLoad());

    const dataListProps = {
      loading,                    // used in redux only
      error,                      // used in redux only
      data: gameInfo,
      Component: RenderQuestItem,
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
          {messages[lang][range]}  {messages[lang].Score}: {gameInfo.bonus}
        </Text>
        <Text style={{color: colors.TEXT[theme], textAlign: 'center', fontSize: 30, fontFamily: fonts.MURRAY, marginTop: 10}}>
          {messages[lang].TimeInGame}:  {gameTime}
        </Text>
          <Text style={{color: colors.MAIN,
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
            borderColor: colors.MAIN,
            fontSize: 40,
            fontFamily: fonts.EACH,
            marginTop: 10,
          }}>
            {messages[lang].PlayedQuests}
          </Text>
        <DataList {...dataListProps} />
      </View>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {};
}

const mapStateToProps = createStructuredSelector({
  theme: makeSelectTheme(),
  language: makeSelectLanguage(),
});

ProfileScreen.propTypes = {
  theme: PropTypes.string,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withNavigation)(ProfileScreen);
