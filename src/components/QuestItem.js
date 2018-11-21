import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import {withNavigation} from 'react-navigation';
import {colors} from "../utils/constants";

class QuestItem extends Component{
    render(){
        const item = this.props.item;
        const locale = this.props.locale.toUpperCase();
        const theme = this.props.theme;
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('QuestInfo', {quest: item})}>
                <View style={{flex:1, flexDirection: 'row', paddingTop: 5, paddingLeft: 5}}>
                    <Image source={{uri : item.image}}
                           style={{width: 40, height: 40, borderRadius: 40/2}} />
                    <View style={{flex:1, paddingLeft: 10, justifyContent: 'center'}}>
                        <Text style={{fontSize: 20, color: colors.TEXT[theme]}}>{item.name[locale]}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
}
export default withNavigation(QuestItem);
