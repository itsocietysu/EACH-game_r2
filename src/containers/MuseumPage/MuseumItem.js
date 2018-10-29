import React, {Component} from 'react';
import { ImageBackground, View, WebView, Dimensions} from 'react-native';
import connect from "react-redux/es/connect/connect";
import {createStructuredSelector} from "reselect";
import {compose} from 'redux';

import { TextContainer, TittleText, DescriptionText, BasicText } from "../styles";
import {makeSelectLanguage} from "../Locales/selectors";



class MuseumItemScreen extends Component{
    render(){
        const navigation = this.props.navigation;
        const item = navigation.getParam('data', ''); // second parameter is some default value
        const locale = this.props.language.toUpperCase();
        const width = Dimensions.get('window').width;
        return(
            <View style={{flex: 1}}>
                <ImageBackground source={{uri: item.image}}
                                 style={{width: width, height: width}}>
                    <TextContainer>
                        <TittleText>{item.name[locale]}</TittleText>
                    </TextContainer>
                </ImageBackground>
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
export default compose(withConnect)(MuseumItemScreen);
