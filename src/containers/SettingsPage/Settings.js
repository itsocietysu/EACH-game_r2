import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { FormattedMessage } from 'react-native-globalize';
import { Switch, TouchableOpacity, View, AsyncStorage, Text} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

import { compose } from 'redux';
import {createStructuredSelector} from "reselect";
import { changeLanguage } from '../../redux/actions/localesActions'
import { changeTheme } from "../../redux/actions/themeActions";
import { changeAuth } from "../../redux/actions/authActions";
import injectReducer from "../../utils/injectReducer";
import reducer from "../../redux/reducers/localesReducer";

import {makeSelectLanguage} from "../../redux/selectors/localesSelectors";
import {makeSelectTheme} from "../../redux/selectors/themeSelectors";
import {makeSelectAuth} from "../../redux/selectors/authSelectors";

import { DARK_THEME, LIGHT_THEME } from "../../redux/constants/themeConstants";
import {colors, fonts, languages, storage, user_agreement_url, bug_report_url} from "../../utils/constants";
import {SettingsText, SettingsTitleText, SettingsAddText, SettingsContainer} from "../styles";
import {renderRow, getKeyByValue} from "../../utils/renderPopUpRow";
import tupleToArray from "../../utils/tupleToArray";
import { revokeToken } from "../../utils/revokeToken"
import {openBugReportGoogleForm} from "../../utils/openBugReportGoogleForm";
import {loadUserData} from "../../redux/actions/userDataActions";
import {openBrowser} from "../../utils/openBrowser";
import {fetchAuthData} from "../../utils/fetchAuthData";
import {fetchUserData} from "../../utils/fetchUserData";

const ContainerView = styled.View`
      flex: 1
      backgroundColor: ${props => props.color}
      paddingRight: 10
      paddingLeft: 10
`;

class SettingsScreen extends Component {
    state = {
        nightValue: false,
        compressValue: false,
        notifyValue: true,
        pickerValue: 'language',
    };

    componentDidMount(){
        try{
            const theme = this.props.theme;
            if(theme === LIGHT_THEME)
                this.setState({nightValue: false});
            else
                this.setState({nightValue: true});

            const locale = this.props.language;
            if (locale in languages){
                this.setState({pickerValue: languages.locale})
            }
        }
        catch(e){
            console.log('Error:: ', e);
            return {Error: true};
        }
    }

    async _authChange() {
        try{
            let auth = await AsyncStorage.getItem(storage.AUTH);
            if (auth === null || auth === undefined || auth === 'false')
                auth = true;
            else
                auth = false;
            AsyncStorage.setItem(storage.AUTH, auth.toString());
            this.props.changeAuth(auth)
        }
        catch(e){
            console.log('Error:: ', e);
        }
    }

    _localeChange(locale){
        try{
            AsyncStorage.setItem('LOCALE', locale);
            this.props.changeLocale(locale)
        }
        catch(e){
            console.log('Error:: ', e);
            return {Error: true};
        }
    }

    _themeChange(value){
        this.setState({nightValue: value});
        const theme = (value)? DARK_THEME : LIGHT_THEME;

        try{
            AsyncStorage.setItem('THEME', theme);
            this.props.changeTheme(theme)
        }
        catch(e){
            console.log('Error:: ', e);
            return {Error: true};
        }
    }

    async _onLogOut(){
        await revokeToken();
        this.props.changeAuth(false);
        this.props.updateUserData(false);
        const data = fetchAuthData();
        const d = fetchUserData();
        console.log(data);
        console.log(d);
        this.props.navigation.navigate('AuthProvider');
    }

    render() {
        const theme = this.props.theme;
        let logout = <View/>;
        if(this.props.auth)
            logout = <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
                onPress={ () => this._onLogOut() }
            >
                <SettingsAddText color={colors.MAIN} font={fonts.MURRAY}>
                    <FormattedMessage message={'Logout'}/>
                </SettingsAddText>
            </TouchableOpacity>
        </View>;
        return (
            <ContainerView color={colors.BASE[this.props.theme]}>
                <View style={{height: '18%', alignItems: 'center', justifyContent: 'center'}}>
                      <SettingsTitleText color={colors.MAIN} font={fonts.EACH}>
                          <FormattedMessage message={'Settings'}/>
                      </SettingsTitleText>
                </View>
                <SettingsContainer>
                    <SettingsText color={colors.TEXT[theme]} font={fonts.MURRAY}>
                        <FormattedMessage message={'Language'}/>
                    </SettingsText>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <ModalDropdown
                            defaultIndex={1}
                            renderRow={renderRow}
                            dropdownStyle={{height: '30%', width: 2.3/5.9*'100%', backgroundColor: colors.BASE[theme]}}
                            options={tupleToArray()}
                            onSelect={(index, value)=>this._localeChange(getKeyByValue(languages, value))}
                        >
                            {renderRow(languages[this.props.language])}
                        </ModalDropdown>
                    </View>
                </SettingsContainer>
                <SettingsContainer>
                    <SettingsText color={colors.TEXT[theme]} font={fonts.MURRAY}>
                        <FormattedMessage message={'NightMode'}/>
                    </SettingsText>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <Switch
                            onValueChange={ (value) => this._themeChange(value)}
                            value={this.state.nightValue}
                        />
                    </View>
                </SettingsContainer>
                <SettingsContainer>
                    <SettingsText color={colors.TEXT[theme]} font={fonts.MURRAY}>
                        <FormattedMessage message={'Notifications'}/>
                    </SettingsText>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <Switch
                            onValueChange={ (value) => alert('In development')}
                            value={this.state.notifyValue}
                        />
                    </View>
                </SettingsContainer>
                <SettingsContainer>
                    <SettingsText color={colors.TEXT[theme]} font={fonts.MURRAY}>
                        <FormattedMessage message={'CompressImg'}/>
                    </SettingsText>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <Switch
                            onValueChange={ (value) => alert('In development')}
                            value={this.state.compressValue}
                        />
                    </View>
                </SettingsContainer>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity
                        onPress={() => openBrowser(user_agreement_url)}
                    >
                        <SettingsAddText color={colors.MAIN} font={fonts.MURRAY}>
                            <FormattedMessage message={'Terms'}/>
                        </SettingsAddText>
                    </TouchableOpacity>
                </View>
                {logout}
            </ContainerView>
    );
  }
}
export function mapDispatchToProps(dispatch) {
    return {
        changeLocale: evt => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(changeLanguage(evt));
        },
        changeTheme: evt => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(changeTheme(evt));
        },
        changeAuth: evt => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(changeAuth(evt));
        },
        updateUserData: evt => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(loadUserData(evt));
        },
    };
}
const mapStateToProps = createStructuredSelector({
    language: makeSelectLanguage(),
    theme: makeSelectTheme(),
    auth: makeSelectAuth(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'settings', reducer });

export default compose(withConnect, withReducer)(SettingsScreen);
