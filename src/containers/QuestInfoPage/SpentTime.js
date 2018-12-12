import React, {Component} from 'react';
import {withNavigation} from "react-navigation";
import {FormattedMessage, FormattedWrapper} from "react-native-globalize";
import styled from 'styled-components/native';

import connect from "react-redux/es/connect/connect";
import {compose} from "redux";
import {createStructuredSelector} from "reselect";

import messages from "../../Messages";

import {colors, fonts} from "../../utils/constants";

import {makeSelectLanguage} from "../../components/Locales/selectors";
import {makeSelectTheme} from "../../components/Theme/selectors";
import {makeSelectFonts} from "../../components/Fonts/selectors";

import getFont from "../../utils/getFont";

const TimeText = styled.Text`
    color: ${props => props.color}
    fontFamily: ${props => props.font}
    paddingLeft: ${props => props.paddingLeft || 0}
    fontSize: 17
`;

const TimeContainer = styled.View`
    flex: 1
    justifyContent: flex-end
    flexDirection: row
    paddingTop: 10
    paddingBottom: 15
    paddingRight: 15
`;

class SpentTime extends Component{

    render(){
        const time = '45 минут';
        const fontLoaded = this.props.font;
        const theme = this.props.theme;
        return(
            <FormattedWrapper locale={this.props.locale} messages={messages}>
                <TimeContainer style={{flexDirection: 'row'}}>
                    <TimeText color={colors.MAIN} font={getFont(fontLoaded, fonts.MURRAY)}><FormattedMessage message={'TimeSpent'}/></TimeText>
                    <TimeText color={colors.TEXT[theme]} font={getFont(fontLoaded, fonts.MURRAY)} paddingLeft={12}>{time}</TimeText>
                </TimeContainer>
            </FormattedWrapper>
        );
    }

}

const mapStateToProps = createStructuredSelector({
    locale: makeSelectLanguage(),
    theme: makeSelectTheme(),
    font: makeSelectFonts(),
});

const withConnect = connect(
    mapStateToProps,
    {},
);

export default compose(
    withConnect,
    withNavigation
)(SpentTime);