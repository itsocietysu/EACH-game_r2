import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import PlayQuestScreen from "../PlayQuestPage/PlayQuestScreen";
import Bonus from "../BonusPage/BonusScreen";


class ResultScreen extends Component{
    render() {
        const result = this.props.navigation.getParam('result','');
        const bonus = this.props.navigation.getParam('bonus','');
        let answer;

        if (result === 'success')
            answer = <Bonus bonus={bonus}/>;
        else
            answer =
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Sorry, but you are wrong =( </Text>
            </View>;
        return (
            <View style={{flex: 1}}>{answer}</View>
        )
    }
}

export default withNavigation(ResultScreen)
