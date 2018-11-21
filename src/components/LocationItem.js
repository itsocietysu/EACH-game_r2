import React, {Component} from 'react'
import {View, Text} from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
import {colors} from "../utils/constants";

export default class LocationItem extends Component{
    render(){
        const item = this.props.item.item;
        const theme = this.props.theme;
        return(
            <View style={{flex:1, flexDirection: 'row'}}>
                <EvilIcons name="location" size={25} color={colors.SECOND[theme]}/>
                <Text style={{textAlign: "center", color: colors.TEXT[theme]}}>{item.name}</Text>
            </View>
        );
    };
}
