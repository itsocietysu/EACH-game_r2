import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import { Entypo } from '@expo/vector-icons';
import {withNavigation} from 'react-navigation';

class QuestItem extends Component{
    render(){
        const item = this.props.item.item;
        const locale = this.props.locale;
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('QuestInfo', {quest: item})}>
                <View style={{flex:1, flexDirection: 'row'}}>
                    <View style={{paddingLeft: 10}}><Entypo name="game-controller" size={35} color={'#ffa366'}/></View>
                    <View style={{flex:1, paddingLeft: 10, justifyContent: 'center'}}><Text style={{fontSize: 20}}>{item.name[locale]}</Text></View>
                </View>
            </TouchableOpacity>
        );
    };
}
export default withNavigation(QuestItem);
