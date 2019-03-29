import React, { Component } from 'react';
import { FormattedMessage } from "react-native-globalize";
import { View, Text, Image, AsyncStorage} from 'react-native';
import PropTypes from "prop-types";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {colors, storage} from "../../utils/constants";
import {LIGHT_THEME} from "../../redux/constants/themeConstants";

import getSystemLocale from '../../utils/getSystemLocale'
import {changeLanguage} from '../../redux/actions/localesActions'
import {changeTheme} from "../../redux/actions/themeActions";
import {changeAuth} from "../../redux/actions/authActions"
import {loadUserData} from "../../redux/actions/userDataActions";
import {tokenInfo} from "../../utils/tokenInfo";


class WelcomeScreen extends Component {
    static contextTypes = {
        store: PropTypes.object.isRequired,
    };

    async componentWillMount(){
        this.setState({loading:true});
        const store = this.context.store;
        // waiting until get device locale
        try{
            // deleteUserData();
            // AsyncStorage.clear();
            let locale = await  AsyncStorage.getItem(storage.LOCALE);
            if(locale === null || locale === undefined)
                locale = await getSystemLocale();
            store.dispatch(changeLanguage(locale));

            let theme = await  AsyncStorage.getItem(storage.THEME);
            if(theme === null || theme === undefined)
                theme = LIGHT_THEME;
            store.dispatch(changeTheme(theme));

            const data = await tokenInfo();
            if (data)
                store.dispatch(changeAuth(true));
            else
                store.dispatch(changeAuth(false));
            store.dispatch(loadUserData(data));
            console.log(data)
        }
        catch (e) {
            console.log('Error:: ', e);
        }

        // TODO: change magic constant 3000
        setTimeout(()=> this.props.navigation.navigate('Home'), 3000)
    }


    render() {
        return (
            <View style={{flex: 1, backgroundColor: colors.LOADING_SCREEN}}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Image
                        source={require('../../../assets/images/welcome_screen_blue.png')}
                        style={{width: wp('100%'), height: wp('100%')}}
                    />
                </View>
                <View style={{flexDirection: 'row', justifyContent:  'flex-end', alignItems:  'flex-end',}}>
                    <Text style={{color: colors.WHITE, paddingRight: 10, paddingBottom: 10}}><FormattedMessage message="Powered"/></Text>
                    <Image
                        source={require('../../../assets/images/its_logo_white.png')}
                        style={{width: wp('23%'), height: hp('5%')}}
                        resizeMode={'stretch'}
                    />
                </View>
            </View>
        );
    }
}

export default WelcomeScreen;
