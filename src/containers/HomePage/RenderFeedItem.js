import React, {Component} from 'react';
import { ImageBackground, View, Dimensions, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation';
import PropTypes from "prop-types";

import {createStructuredSelector} from "reselect";
import connect from "react-redux/es/connect/connect";
import {compose} from "redux";

import getFont from '../../utils/getFont';
import {colors, DESC_BLOCK_HEIGHT, fonts} from "../../utils/constants";
import {TittleContainer, FeedTittleText, HeaderContainer, LogoAvatar, MainTextContainer, FeedDescriptionText, FeedMoreText, ImageMask, Rectangle} from "../styles";

import {makeSelectTheme} from "../../components/Theme/selectors";
import {makeSelectFonts} from "../../components/Fonts/selectors";
import {makeSelectLanguage} from "../../components/Locales/selectors";


class RenderFeedItem extends Component{

    // Render the content into a list item
    render() {
        const item = this.props.item;
        const width = Dimensions.get('window').width;
        const locale = this.props.locale.toUpperCase();
        const theme = this.props.theme;
        const fontLoaded = this.props.font;
        return (
            <View style={{flex: 1}}>
                <TouchableOpacity activeOpacity={0.9} onPress={() => { this.props.navigation.navigate('FeedItem', {data: item}); }}>
                    <HeaderContainer bgColor={colors.BASE[theme]}>
                        <LogoAvatar source={{uri : item.image}} borderColor={colors.MAIN}/>
                        <TittleContainer>
                            <FeedTittleText
                                color={colors.TEXT[theme]}
                                font={getFont(fontLoaded, fonts.EACH)}
                            >
                                {item.title[locale]}
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

RenderFeedItem.propTypes = {
    locale: PropTypes.string,
    theme: PropTypes.string,
    font: PropTypes.bool,
};

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
)(RenderFeedItem);
