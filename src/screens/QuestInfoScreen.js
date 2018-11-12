import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {withNavigation} from 'react-navigation'

class QuestInfoScreen extends  Component {
    render(){
        const navigation = this.props.navigation;
        const quest = navigation.getParam('quest', '');
        return(
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Quest Info</Text>
                <Text>{quest.name["EN"]}</Text>
                <Button onPress={()=>this.props.navigation.navigate('QuestPlay')}
                        title='Play'
                        color='#ffa366'/>
            </View>
        )
    }
}

export default withNavigation(QuestInfoScreen);
