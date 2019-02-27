import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from "react-native-globalize";
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    AsyncStorage,
} from 'react-native';
import Image from 'react-native-remote-svg';
import PropTypes from "prop-types";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {colors, images, SCREEN_WIDTH, storage} from "../../utils/constants";
import getSystemLocale from '../../utils/getSystemLocale'
import { changeLanguage } from '../../components/Locales/actions'
import {changeTheme} from "../../components/Theme/actions";
import {changeAuth} from "../../components/Auth/actions"
import {LIGHT_THEME} from "../../components/Theme/constants";
import {deleteUserData} from "../../utils/revokeToken";

class WelcomeScreen extends Component {
    // cheat access to redux store
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

            let auth = await AsyncStorage.getItem(storage.AUTH);
            if (auth === null || auth === undefined || auth === 'false')
                auth = false;
            else
                auth = true;
            store.dispatch(changeAuth(auth));
        }
        catch (e) {
            console.log('Error:: ', e);
        }


        // TODO: change magic constant 3000
        setTimeout(()=> this.props.navigation.navigate('Home'), 5000)
    }


    render() {
        return (
            <View style={{flex: 1, backgroundColor: colors.LOADING_SCREEN}}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Image
                        source={require('../../../assets/images/welcome_screen_blue.svg')}
                        style={{width: wp('140%'), height: wp('140%')}}
                    />
                </View>
                <View style={styles.textContainer}>
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

const mapStateToProps = (state) => ({
    curState: state
});

export default connect(mapStateToProps, {})(WelcomeScreen);

const styles = StyleSheet.create({
    loaderContainer:{
        flex: 6,
        justifyContent:  'flex-end',
        alignItems:  'center',
    },
    textContainer:{
        flexDirection: 'row',
        justifyContent:  'flex-end',
        alignItems:  'flex-end',
    },
});