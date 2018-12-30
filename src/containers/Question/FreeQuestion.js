import React, {Component} from 'react';
import {View, Alert, Image, TextInput, KeyboardAvoidingView, Text, FlatList, TouchableOpacity, ImageBackground, Dimensions, ScrollView} from 'react-native';
import {withNavigation} from 'react-navigation';

import {TEXT_QUESTION, AR_PAINT_QUESTION, LOCATION_QUESTION} from "./constants";
import CustomList from "../../components/CustomList";
import PickerItem from "../../components/Picker";
import styled from "styled-components/native";
import {QuestButtonText, SpamHello, CentroidFigure, StyledButton} from "../styles";
import messages from "../../Messages";
import {FormattedWrapper, FormattedMessage} from "react-native-globalize";
import {colors, fonts} from "../../utils/constants";
import {createStructuredSelector} from "reselect";
import {makeSelectError, makeSelectLoading, makeSelectResult} from "../../components/ValidateImage/selectors";
import {makeSelectFonts} from "../../components/Fonts/selectors";
import connect from "react-redux/es/connect/connect";
import {mapDispatchToProps} from "./ARQuestion";
import {makeSelectLanguage} from "../../components/Locales/selectors";
import {makeSelectTheme} from "../../components/Theme/selectors";
import {compose} from "redux";
import getFont from "../../utils/getFont";
import ArrowButton from "../../components/ArrowButton";
import HintIcon from "../../components/icons/HintIcon";
import {Dialog, DialogButton, DialogTitle, SlideAnimation} from "react-native-popup-dialog";
import PopupDialog from "react-native-popup-dialog";
import showDialog from "../../components/CustomPopUpDialog";


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

const ButtonText = styled.Text`
    alignSelf: center
    color: ${props => props.color}
    fontFamily: ${props => props.font}
    fontSize: 20
`;

class FreeQuestion extends Component{

    constructor(){
        super();
        this.state={
            answer: null,
        };
    }


    _validateResult(){
        if (this.state.answer === null) {
            Alert.alert('Fill the input field!');
            return;
        }
        let result = 'fail';
        const step = this.props.data;
        const stepsAmount = this.props.stepsAmount;
        const choices = step.choices;
        let bonus = null;
        if(choices.includes(this.state.answer.trim().toLowerCase())) {
            result = 'success';
            bonus = step.bonus;
        }
        this.props.navigation.navigate('Result', {result, bonus, stepsAmount});
    }

    render(){
        const step = this.props.data;
        const theme = this.props.theme;
        const locale = this.props.locale.toUpperCase();
        const fontLoaded = this.props.font;
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
                                <DescText color={colors.MAIN} font={getFont(fontLoaded, fonts.MURRAY)}>
                                    <FormattedMessage message={'FreeTaskDesc'}/>
                                </DescText>
                            </View>

                        </View>

                        <QuestionText color={colors.TEXT[theme]} font={getFont(fontLoaded, fonts.MURRAY)}>
                            {step.question}
                        </QuestionText>

                        <View style={{alignItems: 'center'}}>
                            <DescText color={colors.MAIN} font={getFont(fontLoaded, fonts.MURRAY)}>
                                <FormattedMessage message={'FreeTaskAdd'}/>
                            </DescText>
                            <TextInput
                                selectionColor={colors.MAIN}
                                onChangeText={(text => this.setState({answer: text}))}
                                style={{fontFamily: getFont(fontLoaded, fonts.MURRAY), color: colors.MAIN, fontSize: 20, textAlign: 'center', width: '95%', height: 50, borderColor: colors.MAIN, borderWidth: 2}}

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
                                    <QuestButtonText color={colors.TEXT[theme]} font={getFont(fontLoaded, fonts.EACH)}><FormattedMessage message={'Validate'}/>-></QuestButtonText>
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
    font: makeSelectFonts(),
});

const withConnect = connect(
    mapStateToProps,
    {},
);

export default compose(
    withConnect,
    withNavigation
)(FreeQuestion);
