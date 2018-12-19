import React, {Component} from 'react';
import {View, Alert, Image, Text, FlatList, TouchableOpacity, ImageBackground, Dimensions, ScrollView} from 'react-native';
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


const QuestionText = styled.Text`
    color: ${props => props.color}
    fontFamily: ${props => props.font}
    fontSize: 20px
    textAlign: center
    paddingTop: 10
`;

const DescText = styled.Text`
    alignSelf: center
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

class TextQuestion extends Component{



    constructor(){
        super();
        this.state={
            pickerSelection: -1,
        };
        this._changeSelection = this._changeSelection.bind(this);
    }

    _changeSelection(e){
        this.setState({
            pickerSelection: e
        })
    }

    _validateResult(){
        if (this.state.pickerSelection === -1) {
            Alert.alert('Not selected!');
            return;
        }
        let result = 'fail';
        const step = this.props.data;
        let bonus = null;
        if(this.state.pickerSelection === step.correct) {
            result = 'success';
            bonus = step.bonus;
        }
        this.props.navigation.navigate('Result', {result, bonus});
    }

    render(){
        const step = this.props.data;
        const theme = this.props.theme;
        const locale = this.props.locale.toUpperCase();
        const fontLoaded = this.props.font;
        const {width, height} = Dimensions.get('window');
        return(
            <FormattedWrapper locale={this.props.locale} messages={messages}>
                <View style={{flex: 1, backgroundColor: colors.BASE[theme]}}>
                    <ScrollView style={{flex: 1}}>
                        <View style={{flexDirection: 'row', paddingTop: 5, paddingLeft:5, paddingRight: 5}}>
                            <Image source={{uri: step.avatar.uri}}
                                   style={{width: width*0.45, height: width*0.45}}/>
                            <View style={{flex: 1, paddingLeft: 5}}>
                                <DescText color={colors.MAIN} font={getFont(fontLoaded, fonts.MURRAY)}>
                                    <FormattedMessage message={'ChoiceTaskDesc'}/>
                                </DescText>
                            </View>

                        </View>
                        <QuestionText color={colors.TEXT[theme]} font={getFont(fontLoaded, fonts.MURRAY)}>
                            {step.question}
                        </QuestionText>

                        <FlatList
                            data={step.choices}
                            renderItem={(item)=><PickerItem text={item} state={this.state} theme={theme} fontLoaded={fontLoaded} handler={this._changeSelection}/>}
                            keyExtractor={(item) => step.choices.indexOf(item).toString()}
                            extraData={[theme, this.state]}
                            scrollEnabled={false}
                        />
                        <View style={{alignItems: 'flex-end', paddingRight: 30}}>
                            <ArrowButton
                                onPress={() => this._validateResult(this)}
                                bgColor={colors.BASE[theme]}
                                borderColor={colors.MAIN}
                                width={width*0.55}
                                height={height*0.075}
                            >
                                <QuestButtonText color={colors.TEXT[theme]} font={getFont(fontLoaded, fonts.EACH)}><FormattedMessage message={'Validate'}/>-></QuestButtonText>
                            </ArrowButton>
                        </View>
                        <View style={{height: 20}}/>
                    </ScrollView>
                </View>
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
)(TextQuestion);
