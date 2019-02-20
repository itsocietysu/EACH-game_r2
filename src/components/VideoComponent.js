import React, {Component} from 'react';
import {WebView, View} from 'react-native';
import connect from "react-redux/es/connect/connect";

import {createStructuredSelector} from "reselect";
import {makeSelectTheme} from "./Theme/selectors";

import {colors} from "../utils/constants";

class VideoComponent extends Component{

    render(){
        const theme = this.props.theme;
        const videoUrl = this.props.videoUrl;
        const htmlContent =
            `<html>
                  <head>
                        <meta name="viewport" content="width=device-width, initial-scale=1"/>
                  </head>
                  <body  style="background-color: ${colors.BASE[theme]}" text=${colors.TEXT[theme]}>
                        <div style="position:relative;height:0;padding-bottom:56.25%">
                            <iframe width="560" height="315" src=${videoUrl} allow="encrypted-media" frameborder="0" allowfullscreen style="position:absolute;width:100%;height:100%;left:0"></iframe>
                        </div>
                  </body>
            </html>`;
        return(
            <View style={{flex: 1}}>
                <WebView
                    // source={{html: testHtml1}}
                    source={{baseUrl: '', html: htmlContent}}
                    scalesPageToFit={false}
                    mediaPlaybackRequiresUserAction={true}
                    style={{backgroundColor: colors.BASE[theme]}}
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
