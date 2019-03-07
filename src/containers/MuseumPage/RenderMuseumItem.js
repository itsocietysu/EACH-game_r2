import React, {Component} from 'react';
import { ImageBackground, View, TouchableOpacity, Dimensions } from 'react-native'
import {FormattedWrapper, FormattedMessage} from "react-native-globalize";
import {withNavigation} from 'react-navigation';

import {createStructuredSelector} from "reselect";
import connect from "react-redux/es/connect/connect";
import {compose} from "redux";

import {
    TittleContainer, FeedTittleText, HeaderContainer, LogoAvatar, MainTextContainer, FeedDescriptionText, FeedMoreText, ImageMask, Rectangle} from "../styles";
import {colors, fonts, DESC_BLOCK_HEIGHT} from "../../utils/constants";

import {makeSelectTheme} from "../../redux/selectors/themeSelectors";
import {makeSelectLanguage} from "../../redux/selectors/localesSelectors";
import messages from "../../Messages";


class RenderMuseumItem extends Component{

    // Render the content into a list item
    render() {
        const item = this.props.item;
        const width = Dimensions.get('window').width;
        const locale = this.props.locale.toUpperCase();
        const theme = this.props.theme;
        return (
            <FormattedWrapper locale={this.props.locale} messages={messages}>
                <View style={{flex: 1}}>
                    <TouchableOpacity activeOpacity={0.9} onPress={()=>{this.props.navigation.navigate('MuseumItem', {data: item, page: 'Museums'});}}>
                        <HeaderContainer bgColor={colors.BASE[theme]}>
                            <LogoAvatar source={require('../../../assets/icons/logo.png')} borderColor={colors.MAIN}/>
                            <TittleContainer>
                                <FeedTittleText
                                    color={colors.TEXT[theme]}
                                    font={fonts.EACH}
                                >
                                    {item.name[locale]}
                                </FeedTittleText>
                            </TittleContainer>
                        </HeaderContainer>
                        <ImageBackground source={{uri: item.image}}
                                         style={{width: width, height: width}}>
                            <ImageMask height={width} width={width}/>
                        </ImageBackground>

                        <MainTextContainer bgColor={colors.BASE[theme]} width={width} height={DESC_BLOCK_HEIGHT}>
                            <FeedDescriptionText
                                numberOfLines={3}
                                color={colors.TEXT[theme]}
                                font={fonts.MURRAY}
                            >
                                {item.desc[locale]}
                            </FeedDescriptionText>
                            <FeedMoreText
                                font={fonts.MURRAY}
                            >
                                <FormattedMessage message={'More'}/>
                            </FeedMoreText>
                        </MainTextContainer>
                        <Rectangle width={width} height={1} backgroundColor={colors.SECOND[theme]}/>
                    </TouchableOpacity>
                </View>
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
)(RenderMuseumItem);
