import React, {Component} from 'react';
import {withNavigation} from "react-navigation";
import {FormattedMessage, FormattedWrapper} from "react-native-globalize";
import styled from 'styled-components/native';

import connect from "react-redux/es/connect/connect";
import {compose} from "redux";
import {createStructuredSelector} from "reselect";

import messages from "../../Messages";

import {colors, fonts} from "../../utils/constants";

import {makeSelectLanguage} from "../../redux/selectors/localesSelectors";
import {makeSelectTheme} from "../../redux/selectors/themeSelectors";

import {RatingText} from "../../containers/styles";

const RowContainer = styled.View`
    flex: 0.4
    flexDirection: row
`;

class RatingTuple extends Component{

    render(){
        const rating = 4.7;
        const theme = this.props.theme;
        return(
            <FormattedWrapper locale={this.props.locale} messages={messages}>
                <RowContainer style={{flexDirection: 'row'}}>
                    <RatingText color={colors.MAIN} font={fonts.MURRAY}><FormattedMessage message={'Rating'}/></RatingText>
                    <RatingText color={colors.TEXT[theme]} font={fonts.MURRAY} paddingLeft={12}>{rating}</RatingText>
                </RowContainer>
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
)(RatingTuple);
