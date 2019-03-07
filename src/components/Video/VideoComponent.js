import React, {Component} from 'react';
import {WebView, View} from 'react-native';
import connect from "react-redux/es/connect/connect";

import {createStructuredSelector} from "reselect";
import {makeSelectTheme} from "../../redux/selectors/themeSelectors";

import {colors} from "../../utils/constants";

class VideoComponent extends Component{

    render(){
        const theme = this.props.theme;
        return(
            <View style={{flex: 1}}>
                <WebView
                    // source={{html: testHtml1}}
                    source={{uri: this.props.videoUrl}}
                    scalesPageToFit={false}
                    scrollEnabled={false}
                    mediaPlaybackRequiresUserAction={true}
                    style={{backgroundColor: colors.BASE[theme], width: this.props.width, height: this.props.height}}
                />
            </View>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    theme: makeSelectTheme(),
});

const withConnect = connect(
    mapStateToProps,
    {},
);

export default withConnect(VideoComponent);
