import React, {Component} from 'react';
import { ImageBackground, View, WebView, Dimensions} from 'react-native';
import {createStructuredSelector} from "reselect";
import connect from "react-redux/es/connect/connect";
import {compose} from "redux";
import {makeSelectLanguage} from "../Locales/selectors";
import { TextContainer, TittleText, DescriptionText, BasicText } from "../styles";

class FeedItemScreen extends Component{
    render(){
        const navigation = this.props.navigation;
        const item = navigation.getParam('data',''); // second parameter is some default value
        const locale = this.props.language.toUpperCase();
        const width = Dimensions.get('window').width;
        return(
                <View style={{flex: 1}}>
                    <ImageBackground source={{uri: item.image}}
                                     style={{width: width, height: width}}>
                        <TextContainer>
                            <TittleText>{item.title[locale]}</TittleText>
                        </TextContainer>
                    </ImageBackground>
                    {/* <TextContainer>
                        <BasicText>{item.text["EN"]}</BasicText>
                    </TextContainer> */}
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

