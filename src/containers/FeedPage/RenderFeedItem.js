import React, {Component} from 'react';
import { ImageBackground, View, Dimensions, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation';
import PropTypes from "prop-types";
import {FormattedWrapper, FormattedMessage} from "react-native-globalize";

import {createStructuredSelector} from "reselect";
import connect from "react-redux/es/connect/connect";
import {compose} from "redux";

import {colors, DESC_BLOCK_HEIGHT, fonts} from "../../utils/constants";
import {TittleContainer, FeedTittleText, HeaderContainer, LogoAvatar, MainTextContainer, FeedDescriptionText, FeedMoreText, ImageMask, Rectangle} from "../styles";

import {makeSelectTheme} from "../../redux/selectors/themeSelectors";
import {makeSelectLanguage} from "../../redux/selectors/localesSelectors";
import messages from "../../Messages";



class RenderFeedItem extends Component{

    // Render the content into a list item
    render() {
        const item = this.props.item;
        const width = Dimensions.get('window').width;
        const locale = this.props.locale.toUpperCase();
        const theme = this.props.theme;
        return (
            <FormattedWrapper locale={this.props.locale} messages={messages}>
                <View style={{flex: 1}}>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => { this.props.navigation.navigate('FeedItem', {data: item}); }}>
                        <HeaderContainer bgColor={colors.BASE[theme]}>
                            <LogoAvatar source={require('../../../assets/icons/logo.png')} borderColor={colors.MAIN}/>
                            <TittleContainer>
                                <FeedTittleText
                                    color={colors.TEXT[theme]}
                                    font={fonts.EACH}
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

RenderFeedItem.propTypes = {
    locale: PropTypes.string,
    theme: PropTypes.string,
    font: PropTypes.bool,
};

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
)(RenderFeedItem);
