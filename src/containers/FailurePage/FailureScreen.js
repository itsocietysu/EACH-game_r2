import React, {Component} from 'react';
import {withNavigation} from 'react-navigation';
import {createStructuredSelector} from "reselect";
import {makeSelectLanguage} from "../../redux/selectors/localesSelectors";
import {makeSelectTheme} from "../../redux/selectors/themeSelectors";
import connect from "react-redux/es/connect/connect";
import {mapDispatchToProps} from "../QuestInfoPage/QuestInfoScreen";
import {compose} from "redux";
import {View, ImageBackground, Dimensions} from "react-native";
import {FormattedMessage, FormattedWrapper} from "react-native-globalize";
import messages from "../../Messages";
import {colors, fonts} from "../../utils/constants";
import styled from "styled-components/native";
import {LIGHT_THEME} from "../../redux/constants/themeConstants";
import ArrowButton from "../../components/Button/ArrowButton";

const ErrorText = styled.Text`
    alignSelf: center
    color: ${props => props.color}
    fontFamily: ${props => props.font}
    fontSize: 40
`;

const DescText = styled.Text`
    color: ${props => props.color}
    fontFamily: ${props => props.font}
    fontSize: 30
    paddingTop: 20
`;

const ButtonText = styled.Text`
    alignSelf: center
    color: ${props => props.color}
    fontFamily: ${props => props.font}
    fontSize: 20
`;

class FailureScreen extends Component{

    render(){
        const theme = this.props.theme;
        const {width, height} = Dimensions.get('window');
        const image = (theme === LIGHT_THEME)? require('./../../../assets/images/errorPage.png') : require('./../../../assets/images/errorPageDark.png');
        return(
            <View style={{flex: 1}}>
                <FormattedWrapper locale={this.props.locale} messages={messages}>
                    <ImageBackground
                        style={{width: '100%', height: '100%'}}
                        imageStyle={{resizeMode: 'stretch'}}
                        source={image}
                    >
                        <View style={{flex: 1, paddingTop: 20, paddingLeft: 5}}>
                            <ErrorText color={colors.MAIN} font={fonts.EACH}>
                                <FormattedMessage message={'Failed'}/>
                            </ErrorText>
                        </View>
                        <View style={{flex: 1}}>
                            <View style={{paddingLeft: 10}}>
                                <DescText color={colors.MAIN} font={fonts.MURRAY}>
                                    <FormattedMessage message={'WrongAnsw'}/>
                                </DescText>
                            </View>
                            <View style={{paddingLeft: 10, paddingTop: 40}}>
                                <ArrowButton
                                    onPress={() => this.props.navigation.goBack()}
                                    bgColor={colors.BASE[theme]}
                                    borderColor={colors.MAIN}
                                    width={width*0.55}
                                    height={height*0.075}
                                >
                                    <ButtonText color={colors.TEXT[theme]} font={fonts.EACH}>
                                        <FormattedMessage message={'Back'}/>
                                    </ButtonText>
                                </ArrowButton>
                            </View>
                        </View>
                    </ImageBackground>
                </FormattedWrapper>
            </View>
        );
    }
}


const mapStateToProps = createStructuredSelector({
    locale: makeSelectLanguage(),
    theme: makeSelectTheme(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);
export default compose(
    withNavigation,
    withConnect,
)(FailureScreen);
