import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedWrapper, FormattedMessage } from "react-native-globalize";
import * as Progress from 'react-native-progress';
import {
    StyleSheet,
    ImageBackground,
    View,
    Text,
    Dimensions,
    AsyncStorage,
} from 'react-native';
import PropTypes from "prop-types";

import { colors, images, storage } from "../../utils/constants";
import messages from "../../Messages";
import getSystemLocale from '../../utils/getSystemLocale'
import { changeLanguage } from '../../components/Locales/actions'
import {changeTheme} from "../../components/Theme/actions";
import {LIGHT_THEME} from "../../components/Theme/constants";

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
            let locale = await  AsyncStorage.getItem(storage.LOCALE);
            if(locale === null || locale === undefined)
                locale = await getSystemLocale();
            store.dispatch(changeLanguage(locale));

            let theme = await  AsyncStorage.getItem(storage.THEME);
            if(theme === null || theme === undefined)
                theme = LIGHT_THEME;
            store.dispatch(changeTheme(theme));
        }
        catch (e) {
            console.log('Error:: ', e);
        }


        // TODO: change magic constant 3000
        setTimeout(()=> this.props.navigation.navigate('Home'), 3000)
    }


    render() {
        const dim = Dimensions.get('window');
        return (
            <FormattedWrapper messages={messages}>
                <ImageBackground
                    source = {images.LOADING_SCREEN_IMAGE}
                    style={{height: dim.height-22, width: dim.width}}
                    resizeMode = "stretch"
                >
                    <View style={{flex: 1}}>
                        <View style={styles.loaderContainer}>
                            <Progress.Bar progress={0.3} width={200} color={colors.MAIN} />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={{color: colors.MAIN, paddingRight: 80, paddingBottom: 10}}><FormattedMessage message="Powered"/></Text>
                        </View>
                    </View>
                </ImageBackground>
            </FormattedWrapper>
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
        flexGrow: 1,
        justifyContent:  'flex-end',
        alignItems:  'flex-end',
    },
});