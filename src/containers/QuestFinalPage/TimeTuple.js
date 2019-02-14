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
import {makeSelectFonts} from "../../components/Fonts/selectors";

import messages from "../../Messages";
import {colors, fonts} from "../../utils/constants";
import getFont from "../../utils/getFont";
import {KeyText, ValueText} from "../styles";

const RowContainer = styled.View`
    flexDirection: row
`;

class TimeTuple extends Component{

    render() {
        const time = this.props.time;
        const fontLoaded = this.props.font;
        const theme = this.props.theme;
        return (
            <FormattedWrapper locale={this.props.locale} messages={messages}>
                <RowContainer style={{flexDirection: 'row', width: '100%'}}>
                    <KeyText color={colors.TEXT[theme]} font={getFont(fontLoaded, fonts.MURRAY)}><FormattedMessage
                        message={'Time'}/>
                    </KeyText>
                    <View style={{flex: 1}}>
                        <ValueText color={colors.MAIN} font={getFont(fontLoaded, fonts.MURRAY)} paddingLeft={12}>
                            {time}
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
    font: makeSelectFonts(),
});

const withConnect = connect(
    mapStateToProps,
    {},
);

export default compose(
    withConnect,
    withNavigation
)(TimeTuple);


