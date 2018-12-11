import React, {Component} from 'react'
import {View} from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
import {colors, fonts} from "../utils/constants";
import {MainText} from "../containers/styles";
import getFont from "../utils/getFont";
import {createStructuredSelector} from "reselect";
import {makeSelectTheme} from "./Theme/selectors";
import {makeSelectFonts} from "./Fonts/selectors";
import connect from "react-redux/es/connect/connect";
import {compose} from "redux";
import {withNavigation} from "react-navigation";


class LocationItem extends Component{
    render(){
        const item = this.props.item.item;
        const theme = this.props.theme;
        const font = this.props.font;
        return(
            <View style={{flex:1, flexDirection: 'row'}}>
                <EvilIcons name="location" size={25} color={colors.SECOND[theme]}/>
                <MainText font={getFont(font, fonts.MURRAY)} color={colors.TEXT[theme]}>{item.name}</MainText>
            </View>
        );
    };
}

const mapStateToProps = createStructuredSelector({
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
)(LocationItem)
