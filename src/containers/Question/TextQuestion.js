import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, ImageBackground, Dimensions} from 'react-native';
import {withNavigation} from 'react-navigation';

import {TEXT_QUESTION, AR_PAINT_QUESTION, LOCATION_QUESTION} from "./constants";
import CustomList from "../../components/CustomList";
import PickerItem from "../../components/Picker";
import styled from "styled-components/native";



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
            <View style={{flex: 1}}>
                <QuestionText>{step.question}</QuestionText>
                <ImageBackground source={{uri: step.avatar.uri}}
                             style={{width: width, height: width/2}}/>
                <FlatList
                    data={step.choices}
                    renderItem={(item)=><PickerItem text={item} state={this.state} handler={this._changeSelection}/>}
                    keyExtractor={(item) => step.choices.indexOf(item)}
                    extraData={this.state}
                    scrollEnabled={true}
                />
                <TouchableOpacity onPress={() => this._validateResult(this)}>
                    <Text style={{color: "#0000ff", textAlign : 'center', paddingBottom: 20}}>Ответить</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default withNavigation(TextQuestion);
