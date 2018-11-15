import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import PlayQuestScreen from "./PlayQuestScreen";


class ResultScreen extends Component{
    render() {
        const result = this.props.navigation.getParam('result','');
        const bonus = this.props.navigation.getParam('bonus','');
        let answer;
        const next = 'next';
        if (result === 'success')
            answer = <View>
                        <Text>Congrats!</Text>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('QuestPlay', {next})}>
                            <Text style={{color: '#0000ff'}}>Continue</Text>
                        </TouchableOpacity>
                    </View>;
        else
            answer = <Text>You failed!</Text>;
        return (
            <View
                style={{
                    flex:1,
                    justifyContent: 'center',
                    alignItems: 'center'
                    }}>
                {answer}
            </View>
        )
    }
}

export default withNavigation(ResultScreen)
