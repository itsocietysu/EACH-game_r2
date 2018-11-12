import React, {Component} from 'react'
import {View, Text} from 'react-native'
import { EvilIcons } from '@expo/vector-icons';

export default class LocationItem extends Component{
    render(){
        const item = this.props.item.item;
        return(
            <View style={{flex:1, flexDirection: 'row'}}>
                <EvilIcons name="location" size={25} color={'#ffa366'}/>
                <Text style={{textAlign: "center"}}>{item.name}</Text>
            </View>
        );
    };
}
