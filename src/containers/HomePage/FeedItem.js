/* eslint-disable react/jsx-boolean-value */
import React, {Component} from 'react';
import { View, WebView, Dimensions} from 'react-native';
import {createStructuredSelector} from "reselect";
import connect from "react-redux/es/connect/connect";
import {compose} from "redux";
import {makeSelectLanguage} from "../../components/Locales/selectors";
import {makeSelectTheme} from "../../components/Theme/selectors";
import {colors} from "../../utils/constants";

class FeedItemScreen extends Component
{
    render(){
        const navigation = this.props.navigation;
        const item = navigation.getParam('data','');
        const locale = this.props.language.toUpperCase();
        const width = Dimensions.get('window').width;
        const theme = this.props.theme;

        const htmlContent =
            `<html>
                  <head>
                        <meta name="viewport" content="width=device-width, initial-scale=1"/>
                  </head>
                  <body  style="background-color: ${colors.BASE[theme]}" text=${colors.TEXT[theme]}>
                        <h3>${item.title[locale]}</h3>
                        <img src="${item.image}" width="${width-17}" height="${width-10}">
                        <p>${item.text[locale]}</p>
                  </body>
            </html>`;
        return(
             <View style={{flex: 1}}>
                <WebView
                    // source={{html: testHtml1}}
                    source={{html: htmlContent}}
                    scalesPageToFit={false}
                    mediaPlaybackRequiresUserAction={true}
                    style={{backgroundColor: colors.BASE[theme]}}
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
    theme: makeSelectTheme(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);
export default compose(withConnect)(FeedItemScreen);

