import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import {withNavigation} from 'react-navigation';
import {colors, fonts} from "../utils/constants";
import getFont from "../utils/getFont";
import {MainText} from "../containers/styles";
import {createStructuredSelector} from "reselect";
import {makeSelectTheme} from "./Theme/selectors";
import {makeSelectFonts} from "./Fonts/selectors";
import connect from "react-redux/es/connect/connect";
import {compose} from "redux";
import {makeSelectLanguage} from "./Locales/selectors";

class QuestItem extends Component{
    render(){
        const item = this.props.item;
        const locale = this.props.locale.toUpperCase();
        const theme = this.props.theme;
        const fontLoaded = this.props.font;
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('QuestInfo', {quest: item})}>
                <View style={{flex:1, flexDirection: 'row', paddingTop: 5, paddingLeft: 5}}>
                    <Image source={{uri : item.image}}
                           style={{width: 40, height: 40, borderRadius: 40/2}} />
                    <View style={{flex:1, paddingLeft: 10, justifyContent: 'center'}}>
                        <MainText color={colors.TEXT[theme]} font={getFont(fontLoaded, fonts.EACH)}>{item.name[locale]}</MainText>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
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
)(QuestItem);
