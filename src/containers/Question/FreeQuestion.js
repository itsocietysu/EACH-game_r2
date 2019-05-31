import React, {Component} from 'react';
import {View, ScrollView, Alert, Text, Image, TextInput, KeyboardAvoidingView, Dimensions, findNodeHandle} from 'react-native';
import {withNavigation} from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styled from "styled-components/native";
import {QuestButtonText} from "../styles";
import messages from "../../Messages";
import {FormattedWrapper, FormattedMessage} from "react-native-globalize";
import {colors, fonts, SCREEN_HEIGHT} from "../../utils/constants";
import {createStructuredSelector} from "reselect";
import connect from "react-redux/es/connect/connect";
import {makeSelectLanguage} from "../../redux/selectors/localesSelectors";
import {makeSelectTheme} from "../../redux/selectors/themeSelectors";
import {compose} from "redux";
import ArrowButton from "../../components/Button/ArrowButton";
import HintIcon from "../../components/Icons/HintIcon";
import showDialog from "../../components/PopUpDialog/CustomPopUpDialog";
import {showMessage} from "react-native-flash-message";
import KeyboardListener from 'react-native-keyboard-listener';

const QuestionText = styled.Text`
    color: ${props => props.color}
    fontFamily: ${props => props.font}
    fontSize: 20px
    textAlign: center
    paddingTop: 10
`;

const DescText = styled.Text`
    color: ${props => props.color}
    fontFamily: ${props => props.font}
    fontSize: 20
    paddingTop: 20
`;


class FreeQuestion extends Component{

    constructor(){
        super();
        this.state={
            answer: null,
            keyboardOpen: false,
        };
        this._scrollToInput = this._scrollToInput.bind(this);
        this._scrollToTop = this._scrollToTop.bind(this);
    }


    _validateResult(){
        if (this.state.answer === null || this.state.answer === '') {
            showMessage({
                message: <FormattedMessage message={'FillIn'}/>,
                type: "info",
            });
            return;
        }
        let result = false;
        const step = this.props.data;
        const choices = step.choices;
        choices.forEach(item => item.toLowerCase());
        if(choices.includes(this.state.answer.trim().toLowerCase())) {
            result = true;
        }
        this.props.processResult(result);
    }

    _scrollToInput(reactNode) {
        // Add a 'scroll' ref to your ScrollView
        this.scroll.props.scrollToFocusedInput(reactNode)
    }

    _scrollToTop(){
        this.scroll.props.scrollToPosition(0,0)
    }

    render(){
        const step = this.props.data;
        const theme = this.props.theme;
        const {width, height} = Dimensions.get('window');
        return(
            <FormattedWrapper locale={this.props.locale} messages={messages}>

                    {showDialog(this, <FormattedMessage message={'Hint'}/>, step.hint)}
                {/* <ScrollView style={{height: '100%', backgroundColor: colors.BASE[theme]}}>*/}
                        <KeyboardAwareScrollView style={{flex: 1}} behavior="position" enabled
                            innerRef={ref => {
                                this.scroll = ref
                            }}>
                            <View style={{flexDirection: 'row', paddingTop: 5, paddingLeft:5, paddingRight: 5}}>
                                <Image source={{uri: step.avatar.uri}}
                                       style={{width: width*0.45, height: width*0.45}}/>
                                <View style={{flex: 1, paddingLeft: 5}}>
                                    <DescText color={colors.MAIN} font={fonts.MURRAY}>
                                        <FormattedMessage message={'FreeTaskDesc'}/>
                                    </DescText>
                                </View>

                            </View>

                            <QuestionText color={colors.TEXT[theme]} font={fonts.MURRAY}>
                                {step.question}
                            </QuestionText>

                            <View style={{alignItems: 'center'}}>
                                <DescText color={colors.MAIN} font={fonts.MURRAY}>
                                    <FormattedMessage message={'FreeTaskAdd'}/>
                                </DescText>
                                <TextInput
                                    onFocus={(event) => {
                                        // `bind` the function if you're using ES6 classes
                                        this._scrollToInput(findNodeHandle(event.target))
                                    }}
                                    selectionColor={colors.MAIN}
                                    onChangeText={(text => this.setState({answer: text}))}
                                    style={{
                                        fontFamily: fonts.MURRAY, color: colors.MAIN, fontSize: 20, textAlign: 'center',
                                        width: '95%', height: 50, borderColor: colors.MAIN, borderWidth: 2
                                    }}
                                    onSubmitEditing={() => {
                                        this._validateResult();
                                        this._scrollToTop()}}
                                />
                            </View>

                            <View style={{flex: 1, justifyContent: 'flex-end', paddingTop: 15, paddingBottom: 15, alignItems: 'center'}}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <ArrowButton
                                        onPress={() => this._validateResult()}
                                        bgColor={colors.BASE[theme]}
                                        borderColor={colors.MAIN}
                                        width={width*0.55}
                                        height={height*0.075}
                                    >
                                        <QuestButtonText color={colors.TEXT[theme]} font={fonts.EACH}>
                                            <FormattedMessage message={'Validate'}/>->
                                        </QuestButtonText>
                                    </ArrowButton>
                                    <HintIcon onPress={()=>this.refDialog.show()}/>
                                </View>
                            </View>
                            <View style={{height: SCREEN_HEIGHT*0.3, width: '100%'}}/>
                        </KeyboardAwareScrollView>
                        {/* </ScrollView>*/}

            </FormattedWrapper>

        );
    }
}

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
)(FreeQuestion);
