import React, {Component} from 'react';
import {View, Alert, Text, Image, TextInput, KeyboardAvoidingView, Dimensions} from 'react-native';
import {withNavigation} from 'react-navigation';

import styled from "styled-components/native";
import {QuestButtonText} from "../styles";
import messages from "../../Messages";
import {FormattedWrapper, FormattedMessage} from "react-native-globalize";
import {colors, fonts} from "../../utils/constants";
import {createStructuredSelector} from "reselect";
import connect from "react-redux/es/connect/connect";
import {makeSelectLanguage} from "../../redux/selectors/localesSelectors";
import {makeSelectTheme} from "../../redux/selectors/themeSelectors";
import {compose} from "redux";
import ArrowButton from "../../components/Button/ArrowButton";
import HintIcon from "../../components/Icons/HintIcon";
import showDialog from "../../components/PopUpDialog/CustomPopUpDialog";
import {showMessage} from "react-native-flash-message";


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
        };
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

    render(){
        const step = this.props.data;
        const theme = this.props.theme;
        const {width, height} = Dimensions.get('window');
        return(
            <FormattedWrapper locale={this.props.locale} messages={messages}>
                <KeyboardAvoidingView style={{flex: 1}} behavior="position" enabled>
                    {showDialog(this, <FormattedMessage message={'Hint'}/>, step.hint)}
                    <View style={{height: '100%', backgroundColor: colors.BASE[theme]}}>
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
                                selectionColor={colors.MAIN}
                                onChangeText={(text => this.setState({answer: text}))}
                                style={{
                                    fontFamily: fonts.MURRAY, color: colors.MAIN, fontSize: 20, textAlign: 'center',
                                    width: '95%', height: 50, borderColor: colors.MAIN, borderWidth: 2
                                }}
                                onSubmitEditing={() => this._validateResult()}
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
                    </View>
                </KeyboardAvoidingView>
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
