import React, {Component} from 'react';
import {View} from 'react-native';
import {ErrMessageText} from "../../containers/styles";
import {colors, fonts} from "../../utils/constants";
import {createStructuredSelector} from "reselect";
import {makeSelectTheme} from "../../redux/selectors/themeSelectors";
import connect from "react-redux/es/connect/connect";

class InfoMessage extends Component {
    render(){
        const theme = this.props.theme;
        return(
            <View style={{flex: 1, padding: 20, alignItems: 'center', backgroundColor: colors.BASE[theme]}}>
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
export default withConnect(InfoMessage);


