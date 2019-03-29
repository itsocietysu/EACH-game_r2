import React, { Component } from 'react';
import {withNavigation} from "react-navigation";
import PropTypes from "prop-types";

import {Text, View, ScrollView, SectionList, Dimensions, Image, ActivityIndicator, TouchableOpacity} from "react-native";
import { createStructuredSelector } from "reselect";
import connect from "react-redux/es/connect/connect";
import { compose } from "redux";

import {colors, fonts} from "../../utils/constants";
import { makeSelectTheme } from "../../redux/selectors/themeSelectors";
import { makeSelectLanguage } from "../../redux/selectors/localesSelectors";
import ChooseStatus from '../../utils/ChooseStatus'
import RenderQuestItem from "./RenderQuestItem";
import messages from '../../Messages';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {makeSelectUserData} from "../../redux/selectors/userDataSelectors";
import {openBugReportGoogleForm} from "../../utils/openBugReportGoogleForm";
import {SettingsAddText} from "../styles";

class ProfileScreen extends Component {

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.userData
    }

    render() {
        //const userData = this.props.navigation.getParam('userData', '');
        const userData = this.props.userData;
        const theme = this.props.theme;
        const lang = this.props.language;
        const gameInfo = userData.run;
        const bonus = gameInfo.bonus;
        const range = ChooseStatus(bonus);

        if (!userData)
            return <ActivityIndicator/>;
        return (
            <View
              style={{backgroundColor: colors.BASE[theme],
                alignItems: 'center',
                  flex: 1,
              }}
            >
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity
                        onPress={openBugReportGoogleForm}
                    >
                        <SettingsAddText color={'#f00'} font={fonts.MURRAY}>
                            <Text>Нашли баг? Заполните google-форму</Text>
                        </SettingsAddText>
                    </TouchableOpacity>
                </View>
                <Image
                    source={{uri: userData.image}}
                    fadeDuration={0}
                    style={{
                        width: wp('45%'),
                        height: wp('45%'),
                        borderWidth: 2,
                        borderRadius: wp('45%') / 2,
                        borderColor: colors.MAIN,
                        marginTop: hp('4%'),
                        flex: 0,
                    }}
                />
                <Text style={{color: colors.MAIN, textAlign: 'center', fontSize: wp('14%'), fontFamily: fonts.EACH, marginTop: 10}}>
                    {userData.username}
                </Text>
                <Text style={{color: colors.TEXT[theme], textAlign: 'center', fontSize: wp('7%'), fontFamily: fonts.MURRAY, marginTop: 10}}>
                    {messages[lang][range]}  {messages[lang].Score}: {bonus}
                </Text>
                <Text style={{color: colors.TEXT[theme], textAlign: 'center', fontSize: wp('7%'), fontFamily: fonts.MURRAY, marginTop: 10}}>
                    {messages[lang].TimeInGame}:  {userData.gameTime}
                </Text>
                <ScrollView style={{width: Dimensions.get('window').width - 20, height: Dimensions.get('window').height/5 + 10}}>
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
                    <SectionList
                        renderItem={item => <RenderQuestItem item={item} />}
                        renderSectionHeader={({section: {title}}) => (
                          <Text style={{fontFamily: fonts.EACH, color: colors.TEXT[theme]}}>{title}</Text>
                        )}
                        sections={[
                          {title: messages[lang].ProcTitle, data: gameInfo.game_process},
                          {title: messages[lang].PassTitle, data: gameInfo.game_passed},
                        ]}
                        keyExtractor={(item, index) => item + index}
                    />
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = createStructuredSelector({
  theme: makeSelectTheme(),
  language: makeSelectLanguage(),
    userData: makeSelectUserData(),
});

ProfileScreen.propTypes = {
  theme: PropTypes.string,
};

const withConnect = connect(mapStateToProps);

export default compose(withConnect, withNavigation)(ProfileScreen);
