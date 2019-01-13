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
    // const locale = this.props.locale.toUpperCase();
    // const theme = this.props.theme;
    // const fontLoaded = this.props.font;
    return (
      <View style={{flexDurection: "row"}}>
        <Text> Hello </Text>
        <Text> world! </Text>
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
)(PassedQuest);
