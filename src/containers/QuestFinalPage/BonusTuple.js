import React, {Component} from 'react';
import {View} from 'react-native';
import {withNavigation} from "react-navigation";
import styled from "styled-components/native";
import {FormattedMessage, FormattedWrapper} from "react-native-globalize";

import connect from "react-redux/es/connect/connect";
import {compose} from "redux";
import {createStructuredSelector} from "reselect";
import {makeSelectLanguage} from "../../components/Locales/selectors";
import {makeSelectTheme} from "../../components/Theme/selectors";

import messages from "../../Messages";
import {colors, fonts} from "../../utils/constants";
import {KeyText, ValueText} from "../styles";


const RowContainer = styled.View`
    flexDirection: row
`;

class BonusTuple extends Component{
    render() {
        const bonus = this.props.bonus;
        const theme = this.props.theme;
        return (
            <FormattedWrapper locale={this.props.locale} messages={messages}>
                <RowContainer style={{flexDirection: 'row', width: '100%'}}>
                    <KeyText color={colors.TEXT[theme]} font={fonts.MURRAY}><FormattedMessage
                            message={'Bonus'}/></KeyText>
                    <View style={{flex: 1}}>
                        <ValueText color={colors.MAIN} font={fonts.MURRAY} paddingLeft={12}>
                            {bonus}
                         </ValueText>
                    </View>
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
)(BonusTuple);


