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

import {TimeText} from "../styles";

const TimeContainer = styled.View`
    flex: 1
    justifyContent: flex-end
    flexDirection: row
`;

class SpentTime extends Component{

    render(){
        const time = '45 минут';
        const theme = this.props.theme;
        return(
            <FormattedWrapper locale={this.props.locale} messages={messages}>
                <TimeContainer style={{flexDirection: 'row'}}>
                    <TimeText color={colors.MAIN} font={fonts.MURRAY}><FormattedMessage message={'TimeSpent'}/></TimeText>
                    <TimeText color={colors.TEXT[theme]} font={fonts.MURRAY} paddingLeft={12}>{time}</TimeText>
                </TimeContainer>
            </FormattedWrapper>
        );
    }

}

const mapStateToProps = createStructuredSelector({
    locale: makeSelectLanguage(),
    theme: makeSelectTheme(),
});

const withConnect = connect(
    mapStateToProps,
    {},
);

export default compose(
    withConnect,
    withNavigation
)(SpentTime);
