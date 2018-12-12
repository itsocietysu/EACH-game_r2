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

const RatingText = styled.Text`
    color: ${props => props.color}
    fontFamily: ${props => props.font}
    paddingLeft: ${props => props.paddingLeft || 0}
    fontSize: 17
`;

const RowContainer = styled.View`
    flex: 0.4
    flexDirection: row
    paddingTop: 10
    paddingBottom: 15
    paddingLeft: 15
`;

class Rating extends Component{

    render(){
        const rating = 4.7;
        const fontLoaded = this.props.font;
        const theme = this.props.theme;
        return(
            <FormattedWrapper locale={this.props.locale} messages={messages}>
                <RowContainer style={{flexDirection: 'row'}}>
                    <RatingText color={colors.MAIN} font={getFont(fontLoaded, fonts.MURRAY)}><FormattedMessage message={'Rating'}/></RatingText>
                    <RatingText color={colors.TEXT[theme]} font={getFont(fontLoaded, fonts.MURRAY)} paddingLeft={12}>{rating}</RatingText>
                </RowContainer>
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
)(Rating);