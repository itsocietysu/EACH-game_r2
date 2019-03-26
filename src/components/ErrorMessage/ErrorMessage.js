import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {ErrMessageText} from "../../containers/styles";
import {FormattedMessage} from "react-native-globalize";
import {colors, fonts} from "../../utils/constants";
import {createStructuredSelector} from "reselect";
import {makeSelectTheme} from "../../redux/selectors/themeSelectors";
import connect from "react-redux/es/connect/connect";

class ErrorMessage extends Component {
    render(){
        const theme = this.props.theme;
        return(
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.BASE[theme]}}>
                <ErrMessageText color={colors.TEXT[theme]} font={fonts.MURRAY}><FormattedMessage message={'ErrWrong'}/></ErrMessageText>
                <ErrMessageText color={colors.TEXT[theme]} font={fonts.MURRAY}><FormattedMessage message={'ErrHandle'}/></ErrMessageText>
                <ErrMessageText color={colors.TEXT[theme]} font={fonts.MURRAY}>{this.props.message}</ErrMessageText>
            </View>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    theme: makeSelectTheme(),
});

const withConnect = connect(
    mapStateToProps,
    {},
);
export default withConnect(ErrorMessage);


