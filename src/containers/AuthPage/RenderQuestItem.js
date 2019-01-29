import React, {Component} from 'react';
import { View, Dimensions} from 'react-native';
import { Image } from 'react-native-remote-svg';
import { withNavigation } from 'react-navigation';
import PropTypes from "prop-types";

import {createStructuredSelector} from "reselect";
import connect from "react-redux/es/connect/connect";
import {compose} from "redux";

import {colors, DESC_BLOCK_HEIGHT, fonts} from "../../utils/constants";
// import getFont from '../../utils/getFont';
// import {TittleContainer, FeedTittleText, HeaderContainer, LogoAvatar, MainTextContainer, FeedDescriptionText, FeedMoreText, ImageMask, Rectangle} from "../styles";

import {makeSelectTheme} from "../../components/Theme/selectors";
import {makeSelectFonts} from "../../components/Fonts/selectors";
import {makeSelectLanguage} from "../../components/Locales/selectors";

class RenderFeedItem extends Component{
  render() {
    // const item = this.props.item;
    // const width = Dimensions.get('window').width;
    // const locale = this.props.locale.toUpperCase();
    // const theme = this.props.theme;
    // const fontLoaded = this.props.font;

    return (
      <View style={{flexDirection: "row"}}>
        <Image
          source = {{}}
          fadeDuration={0}
          style={{width: 40,
            height: 40,
            borderWidth: 0.5,
            borderRadius: 20,
            borderColor: colors.MAIN,
            flex: 0,
          }}
        />

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
