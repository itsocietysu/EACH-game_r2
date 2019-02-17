import React, {Component} from 'react'
import {View, TouchableOpacity, Image} from 'react-native'
import {withNavigation} from 'react-navigation';
import { FormattedWrapper } from 'react-native-globalize';

import connect from "react-redux/es/connect/connect";
import {compose} from "redux";
import {createStructuredSelector} from "reselect";
import {makeSelectTheme} from "./Theme/selectors";
import {makeSelectLanguage} from "./Locales/selectors";

import {colors, fonts} from "../utils/constants";
import {GameTitleText} from "../containers/styles";
import messages from "../Messages";
import {renderMark} from "../utils/renderMark";

class QuestItem extends Component{
    render(){
        const item = this.props.item;
        const locale = this.props.locale.toUpperCase();
        const theme = this.props.theme;
        return(
            <FormattedWrapper locale={this.props.locale} messages={messages} >
                <TouchableOpacity onPress={() => this.props.navigation.navigate('QuestInfo', {quest: item})}>
                    <View style={{flex:1, flexDirection: 'row', alignItems: 'center', paddingTop: 5, paddingLeft: 5}}>
                        <Image source={{uri : item.image}}
                               style={{width: 40, height: 40, borderRadius: 40/2}} />
                        <View style={{flex: 3, paddingLeft: 10}}>
                            <GameTitleText color={colors.TEXT[theme]} font={fonts.EACH}>{item.name[locale]}</GameTitleText>
                        </View>
                        <View style={{flex: 1, paddingLeft: 5}}>
                            {renderMark(item.mark)}
                        </View>
                    </View>
                </TouchableOpacity>
            </FormattedWrapper>
        );
    };
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
)(QuestItem);
