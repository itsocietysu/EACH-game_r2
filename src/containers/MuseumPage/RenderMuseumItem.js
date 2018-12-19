import React, {Component} from 'react';
import { ImageBackground, View, TouchableOpacity, Dimensions } from 'react-native'
import {withNavigation} from 'react-navigation';

import {createStructuredSelector} from "reselect";
import connect from "react-redux/es/connect/connect";
import {compose} from "redux";

import {
    TittleContainer, FeedTittleText, HeaderContainer, LogoAvatar, MainTextContainer, FeedDescriptionText, FeedMoreText, ImageMask, Rectangle} from "../styles";
import {colors, fonts, DESC_BLOCK_HEIGHT} from "../../utils/constants";
import getFont from "../../utils/getFont";

import {makeSelectTheme} from "../../components/Theme/selectors";
import {makeSelectFonts} from "../../components/Fonts/selectors";
import {makeSelectLanguage} from "../../components/Locales/selectors";


class RenderMuseumItem extends Component{

    // Render the content into a list item
    render() {
        const item = this.props.item;
        const width = Dimensions.get('window').width;
        const locale = this.props.locale.toUpperCase();
        const theme = this.props.theme;
        const fontLoaded = this.props.font;
        return (
            <View style={{flex: 1}}>
                <TouchableOpacity activeOpacity={0.9} onPress={()=>{this.props.navigation.navigate('MuseumItem', {data: item, page: 'Museums'});}}>
                    <HeaderContainer bgColor={colors.BASE[theme]}>
                        <LogoAvatar source={{uri : item.image}} borderColor={colors.MAIN}/>
                        <TittleContainer>
                            <FeedTittleText
                                color={colors.TEXT[theme]}
                                font={getFont(fontLoaded, fonts.EACH)}
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
                            font={getFont(fontLoaded, fonts.MURRAY)}
                        >
                            {item.desc[locale]}
                        </FeedDescriptionText>
                        <FeedMoreText
                            font={getFont(fontLoaded, fonts.MURRAY)}
                        >
                            more...
                        </FeedMoreText>
                    </MainTextContainer>
                    <Rectangle width={width} height={1} backgroundColor={colors.SECOND[theme]}/>
                </TouchableOpacity>
            </View>
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
)(RenderMuseumItem);
