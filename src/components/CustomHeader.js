import React from "react";
import {Image, View, Dimensions} from "react-native";
import {createStructuredSelector} from "reselect";
import connect from "react-redux/es/connect/connect";
import {compose} from "redux";
import {withNavigation} from "react-navigation";

import {makeSelectLanguage} from "./Locales/selectors";
import {makeSelectTheme} from "./Theme/selectors";
import {colors, images} from "../utils/constants";
import {DARK_THEME} from "./Theme/constants";

class CustomHeader extends React.Component {
    render() {
        const theme = this.props.theme;
        const width = Dimensions.get('window').width;
        const logo = (theme === DARK_THEME)? images.HEADER_DARK : images.HEADER_LIGHT;
        return (
            <View style={{flex:1}}>
                <View style={{flex:1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.BASE[theme], paddingTop: 12}}>
                    <Image
                        source={logo}
                        style={{ width: 120, height: 20, resizeMode: 'stretch' }}
                    />
                </View>
                <View style={{height: 1, width: width, backgroundColor: colors.SECOND[theme]}}/>
            </View>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    language: makeSelectLanguage(),
    theme: makeSelectTheme(),
});

const withConnect = connect(
    mapStateToProps,
    {},
);

export default compose(withNavigation, withConnect)(CustomHeader);
