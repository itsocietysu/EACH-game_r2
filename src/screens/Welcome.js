import React, { Component } from 'react';
import { connect } from 'react-redux';
import {FormattedWrapper, FormattedMessage} from "react-native-globalize";
import * as Progress from 'react-native-progress';
import {
    StyleSheet,
    ImageBackground,
    View,
    ActivityIndicator,
    Text
} from 'react-native'
import PropTypes from "prop-types";


import messages from "../Messages";
import getSystemLocale from './../utils/getSystemLocale'
import { changeLanguage } from './../containers/Locales/actions'


class WelcomeScreen extends Component {
    // cheat access to redux store
    static contextTypes = {
        store: PropTypes.object.isRequired,
    };

    async componentWillMount(){
        this.setState({loading:true});
        // waiting until get device locale
        const locale = await getSystemLocale();
        this.context.store.dispatch(changeLanguage(locale));

        // TODO: change magic constant 3000
        setTimeout(()=> this.props.navigation.navigate('Home'), 3000)
    }

    render() {
        return (
            <FormattedWrapper /* locale={this.props.curState.Language.language}*/ messages={messages}>
                <ImageBackground
                    source = {require('./../../assets/images/logo.png')}
                    style={styles.logoContainer}>
                    <View style={{flex: 1}}>
                        <View style={styles.loaderContainer}>
                            {/* <ActivityIndicator size={'large'} color={'#ffffff'}/>*/}
                            <Progress.Bar progress={0.3} width={200} color={'#ffa366'} />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={{color: '#ffa366'}}><FormattedMessage message="Powered"/></Text>
                        </View>
                    </View>
                </ImageBackground>
            </FormattedWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    curState:state
});

export default connect(mapStateToProps, {
})(WelcomeScreen);

const styles = StyleSheet.create({
    logoContainer:{
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignContent:  'center',
    },
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