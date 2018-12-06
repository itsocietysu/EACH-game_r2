import React, { Component } from 'react';
import Expo from 'expo';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { FormattedWrapper, FormattedMessage } from 'react-native-globalize';
import { Button, AsyncStorage} from 'react-native';
import { compose } from 'redux';
import {createStructuredSelector} from "reselect";
import { changeLanguage } from '../../components/Locales/actions'
import { changeTheme } from "../../components/Theme/actions";
import { DARK_THEME, LIGHT_THEME } from "../../components/Theme/constants";

import messages from '../../Messages';
import injectReducer from "../../utils/injectReducer";
import reducer from "../../components/Locales/reducer";



import {makeSelectLanguage} from "../../components/Locales/selectors";
import {makeSelectTheme} from "../../components/Theme/selectors";
import {colors} from "../../utils/constants";

const ContainerView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
  backgroundColor: ${props => props.color}
`;

const TitleText = styled.Text`
  fontSize: 30;
  color: ${props => props.theme.WHITE};
`;

class SettingsScreen extends Component {

    _localeChange(locale){
        try{
            AsyncStorage.setItem('LOCALE', locale);
            this.props.changeLocale(locale)
        }
        catch(e){
            console.log('Error:: ', e);
        }
    }

    _themeChange(theme){
        try{
            AsyncStorage.setItem('THEME', theme);
            this.props.changeTheme(theme)
        }
        catch(e){
            console.log('Error:: ', e);
        }
    }

    render() {
        return (
			<FormattedWrapper locale={this.props.language? this.props.language: 'en'} messages={messages} >
                <ContainerView color={colors.BASE[this.props.theme]}>
                  <TitleText><FormattedMessage message={'Settings'}/></TitleText>
                    <Button title={"Change language to russian"} onPress={()=>this._localeChange('ru')}/>
                    <Button title={"Change language to english"} onPress={()=>this._localeChange('en')}/>
                    <Button title={"Change theme to Light"} onPress={()=>this._themeChange(LIGHT_THEME)}/>
                    <Button title={"Change theme to Dark"} onPress={()=>this._themeChange(DARK_THEME)}/>
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
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'settings', reducer });

export default compose(withConnect, withReducer)(SettingsScreen);
