import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import PlayQuestScreen from "../PlayQuestPage/PlayQuestScreen";
import Bonus from "../BonusPage/BonusScreen";
import FailureScreen from '../FailurePage/FailureScreen'

class ResultScreen extends Component{
    render() {
        const result = this.props.navigation.getParam('result','');
        const bonus = this.props.navigation.getParam('bonus','');
        const stepsAmount = this.props.navigation.getParam('stepsAmount','');
        let answer;

        if (result === 'success')
            answer = <Bonus bonus={bonus} stepsAmount={stepsAmount}/>;
        else
            answer = <FailureScreen/>
        return (
            <View style={{flex: 1}}>{answer}</View>
        )
    }
}

export default withNavigation(ResultScreen)
