import React, {Component} from 'react';
import {View, Alert, Text, FlatList, TouchableOpacity, ImageBackground, Dimensions, ScrollView} from 'react-native';
import {withNavigation} from 'react-navigation';

import {TEXT_QUESTION, AR_PAINT_QUESTION, LOCATION_QUESTION} from "./constants";
import CustomList from "../../components/CustomList";
import PickerItem from "../../components/Picker";
import styled from "styled-components/native";
import {SpamHello, CentroidFigure, ButtonText, StyledButton} from "../styles";
import messages from "../../Messages";
import {FormattedWrapper, FormattedMessage} from "react-native-globalize";
import {colors} from "../../utils/constants";


const QuestionText = styled.Text`
    color: ${props => props.color}
    fontSize: 20px
    fontWeight: bold
    textAlign: center
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

    _validateResult(component){
        if (component.state.pickerSelection === -1) {
            Alert.alert('Not selected!');
            return;
        }
        let result = 'fail';
        const step = component.props.data;
        let bonus = null;
        if(component.state.pickerSelection === step.correct) {
            result = 'success';
            bonus = step.bonus;
        }
        component.props.navigation.navigate('Result', {result, bonus});
    }

    render(){
        const step = this.props.data;
        const theme = this.props.theme;
        const width = Dimensions.get('window').width;
        return(
            <FormattedWrapper locale={this.props.language} messages={messages}>
                <View style={{flex: 1, backgroundColor: colors.BASE[theme]}}>
                    <ScrollView style={{flex: 1}}>
                        <QuestionText color={colors.TEXT[theme]}>{step.question}</QuestionText>
                        <View style={{paddingBottom: 10}}>
                            <ImageBackground source={{uri: step.avatar.uri}}
                                     style={{width: width, height: width/2}}/>
                        </View>
                        <FlatList
                            data={step.choices}
                            renderItem={(item)=><PickerItem text={item} state={this.state} theme={theme} handler={this._changeSelection}/>}
                            keyExtractor={(item) => step.choices.indexOf(item)}
                            extraData={[theme, this.state]}
                            scrollEnabled={false}
                        />
                        <TouchableOpacity onPress={() => this._validateResult(this)}>
                            <CentroidFigure>
                                <StyledButton color={colors.THIRD[theme]}>
                                    <ButtonText color={colors.BUTTON_TEXT[theme]}><FormattedMessage message={'Validate'}/></ButtonText>
                                </StyledButton>
                            </CentroidFigure>
                        </TouchableOpacity>
                        <View style={{height: 20}}/>
                    </ScrollView>
                </View>
            </FormattedWrapper>
        );
    }
}

export default withNavigation(TextQuestion);
