/* eslint-disable react/jsx-boolean-value */
import React, {Component} from 'react';
import { Image, ScrollView, View, Text, WebView, Dimensions} from 'react-native';
import {createStructuredSelector} from "reselect";
import connect from "react-redux/es/connect/connect";
import {compose} from "redux";
import {makeSelectLanguage} from "../Locales/selectors";
import { TextContainer, TittleText, DescriptionText, BasicText } from "../styles";

class FeedItemScreen extends Component{
    render(){
        const htmlHead = `<head>
                                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                          </head>`;

        const navigation = this.props.navigation;
        const item = navigation.getParam('data',''); // second parameter is some default value
        const locale = this.props.language.toUpperCase();
        const width = Dimensions.get('window').width;

        const htmlPoster = `<img src="${item.image}" width="${width-17}" height="${width-10}">`;
        return(
             <View style={{flex: 1}}>
                <WebView
                    // source={{html: testHtml1}}
                    source={{html: htmlHead + htmlPoster + item.text[locale]}}
                    scalesPageToFit={false}
                    mediaPlaybackRequiresUserAction={true}
                />
             </View>
        );
    }
}
export function mapDispatchToProps(dispatch) {
    return {}
}

const mapStateToProps = createStructuredSelector({
    language: makeSelectLanguage(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);
export default compose(withConnect)(FeedItemScreen);

