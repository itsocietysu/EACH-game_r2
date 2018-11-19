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



const QuestionText = styled.Text`
    color: 'rgb(0,0,0)'
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
        const width = Dimensions.get('window').width;
        return(
            <FormattedWrapper locale={this.props.language} messages={messages}>
                <View style={{flex: 1, backgroundColor: '#ffffff'}}>
                    <ScrollView style={{flex: 1}}>
                        <QuestionText>{step.question}</QuestionText>
                        <View style={{paddingBottom: 10}}>
                            <ImageBackground source={{uri: step.avatar.uri}}
                                     style={{width: width, height: width/2}}/>
                        </View>
                        <FlatList
                            data={step.choices}
                            renderItem={(item)=><PickerItem text={item} state={this.state} handler={this._changeSelection}/>}
                            keyExtractor={(item) => step.choices.indexOf(item)}
                            extraData={this.state}
                            scrollEnabled={false}
                        />
                        <TouchableOpacity onPress={() => this._validateResult(this)}>
                            <CentroidFigure>
                                <StyledButton color={'#ff0000'}>
                                    <ButtonText color={"#ffffff"}><FormattedMessage message={'Validate'}/></ButtonText>
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
