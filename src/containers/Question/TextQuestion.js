import React, {Component} from 'react';
import {View, Alert, Image, FlatList, Dimensions, ScrollView} from 'react-native';
import {withNavigation} from 'react-navigation';

import PickerItem from "../../components/Picker/Picker";
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
import showDialog from '../../components/PopUpDialog/CustomPopUpDialog';
import {showMessage} from "react-native-flash-message";

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


class TextQuestion extends Component{

    constructor(){
        super();
        this.state={
            pickerSelection: -1,
        };
        this._changeSelection = this._changeSelection.bind(this);
    }

    _changeSelection(value){
        this.setState({
            pickerSelection: value
        })
    }

    _validateResult(){
        if (this.state.pickerSelection === -1) {
            showMessage({
                message: <FormattedMessage message={'NotSet'}/>,
                type: "info",
            });
            return;
        }
        let result = false;
        const step = this.props.data;

        if(this.state.pickerSelection === step.correct) {
            result = true;
        }
        this.props.processResult(result);
        this.setState({pickerSelection: -1});
    }

    render(){
        const step = this.props.data;
        const theme = this.props.theme;
        const {width, height} = Dimensions.get('window');
        return(
            <FormattedWrapper locale={this.props.locale} messages={messages}>
                <View style={{flex: 1, backgroundColor: colors.BASE[theme]}}>
                    {showDialog(this, <FormattedMessage message={'Hint'}/>, step.hint)}
                    <ScrollView style={{flex: 1}}>
                        <View style={{flexDirection: 'row', paddingTop: 5, paddingLeft:5, paddingRight: 5}}>
                            <Image source={{uri: step.avatar.uri}}
                                   style={{width: width*0.45, height: width*0.45}}/>
                            <View style={{flex: 1, paddingLeft: 5}}>
                                <DescText color={colors.MAIN} font={fonts.MURRAY}>
                                    <FormattedMessage message={'ChoiceTaskDesc'}/>
                                </DescText>
                            </View>

                        </View>
                        <QuestionText color={colors.TEXT[theme]} font={fonts.MURRAY}>
                            {step.question}
                        </QuestionText>

                        <FlatList
                            data={step.choices}
                            renderItem={(item)=><PickerItem text={item} state={this.state} theme={theme} handler={this._changeSelection}/>}
                            keyExtractor={(item) => step.choices.indexOf(item).toString()}
                            extraData={[theme, this.state]}
                            scrollEnabled={false}
                        />
                        <View style={{flex: 1, justifyContent: 'flex-end', paddingTop: 15, paddingBottom: 15, alignItems: 'center'}}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <ArrowButton
                                    onPress={() => this._validateResult()}
                                    bgColor={colors.BASE[theme]}
                                    borderColor={colors.MAIN}
                                    width={width*0.55}
                                    height={height*0.075}
                                >
                                    <QuestButtonText color={colors.TEXT[theme]} font={fonts.EACH}><FormattedMessage message={'Validate'}/>-></QuestButtonText>
                                </ArrowButton>
                                <HintIcon onPress={()=>this.refDialog.show()}/>
                            </View>
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
});

const withConnect = connect(
    mapStateToProps,
    {},
);

export default compose(
    withConnect,
    withNavigation
)(TextQuestion);
