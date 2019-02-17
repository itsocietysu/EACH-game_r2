import React from "react";
import {Image, View} from "react-native";
import {createStructuredSelector} from "reselect";
import connect from "react-redux/es/connect/connect";
import {compose} from "redux";
import {withNavigation} from "react-navigation";

import {makeSelectTheme} from "./Theme/selectors";
import {
    colors,
    HeaderLabelHeight,
    HeaderLabelWidth,
    images,
    StatusBarHeight, HeaderPadding
} from "../utils/constants";
import {DARK_THEME} from "./Theme/constants";

class CustomHeader extends React.Component {
    render() {
        const theme = this.props.theme;
        const logo = (theme === DARK_THEME)? images.HEADER_DARK : images.HEADER_LIGHT;
        return (
            <View style={{flex:1}}>
                <View style={{width: '100%', height: StatusBarHeight, backgroundColor: colors.HEADERS[theme]}}/>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.HEADERS[theme], paddingTop: HeaderPadding}}>
                    <Image
                        source={logo}
                        style={{ width: HeaderLabelWidth, height: HeaderLabelHeight, resizeMode: 'stretch' }}
                    />
                </View>
                <View style={{height: 1, width: '100%', backgroundColor: colors.SECOND[theme]}}/>
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

export default compose(withNavigation, withConnect)(CustomHeader);
