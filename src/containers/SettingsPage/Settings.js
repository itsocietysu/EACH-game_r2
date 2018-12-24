import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { FormattedWrapper, FormattedMessage } from 'react-native-globalize';
import { Switch, TouchableOpacity, View, AsyncStorage} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

import { compose } from 'redux';
import {createStructuredSelector} from "reselect";
import { changeLanguage } from '../../components/Locales/actions'
import { changeTheme } from "../../components/Theme/actions";
import injectReducer from "../../utils/injectReducer";
import reducer from "../../components/Locales/reducer";

import {makeSelectLanguage} from "../../components/Locales/selectors";
import {makeSelectTheme} from "../../components/Theme/selectors";
import {makeSelectFonts} from "../../components/Fonts/selectors";

import { DARK_THEME, LIGHT_THEME } from "../../components/Theme/constants";
import messages from '../../Messages';
import {colors, fonts, languages} from "../../utils/constants";
import {SettingsText, SettingsTitleText, SettingsAddText, SettingsContainer} from "../styles";
import {renderRow, getKeyByValue} from "../../utils/renderPopUpRow";
import tupleToArray from "../../utils/tupleToArray";

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
        }
    }

    _localeChange(locale){
        try{
            AsyncStorage.setItem('LOCALE', locale);
            this.props.changeLocale(locale)
        }
        catch(e){
            console.log('Error:: ', e);
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
        }
    }

    render() {
        const theme = this.props.theme;
        return (
			<FormattedWrapper locale={this.props.language? this.props.language: 'en'} messages={messages} >
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
                                dropdownStyle={{height: '30%', width: 2.3/5.9*'100%'}}
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
                            onPress={()=>alert('Пользовательское соглашение')}
                        >
                            <SettingsAddText color={colors.MAIN} font={fonts.MURRAY}>
                                <FormattedMessage message={'Terms'}/>
                            </SettingsAddText>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity
                            onPress={()=>alert('Выходим из аккаунта пользователя')}
                        >
                            <SettingsAddText color={colors.MAIN} font={fonts.MURRAY}>
                                <FormattedMessage message={'Logout'}/>
                            </SettingsAddText>
                        </TouchableOpacity>
                    </View>
                </ContainerView>
			</FormattedWrapper>
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
    };
}
const mapStateToProps = createStructuredSelector({
    language: makeSelectLanguage(),
    theme: makeSelectTheme(),
    font: makeSelectFonts(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'settings', reducer });

export default compose(withConnect, withReducer)(SettingsScreen);
