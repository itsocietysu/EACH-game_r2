import {ImageBackground, View, Dimensions, TouchableOpacity, Image, Text} from 'react-native'
import React, {Component} from 'react';
import { withNavigation } from 'react-navigation';

import { TextContainer, TittleText, DescriptionText } from "../styles";


class RenderFeedItem extends Component{

    // Render the content into a list item
    render() {
        const item = this.props.item;
        const width = Dimensions.get('window').width;
        const locale = this.props.locale.toUpperCase();
        return (
            <View style={{flex: 1}}>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('FeedItem', {data: item, locale});}}>
                    <View style={{flexDirection: 'row', backgroundColor: '#ffffff', paddingLeft: 4, paddingBottom: 4, paddingTop: 2, paddingRight: 2}}>
                        <View style={{flex: 0.15, flexDirection: 'row'}}>
                            <Image source={{uri : item.image}}
                                   style={{width: 40, height: 40, borderRadius: 40/2, borderWidth: 1, borderColor: '#ffa366'}} />
                        </View>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>{item.title[locale]}</Text>
                        </View>
                    </View>
                    <View>
                        <ImageBackground source={{uri: item.image}}
                                         style={{width: width, height: width}}/>
                    </View>
                    <View style={{flex: 1, backgroundColor: '#ffffff', width: width, height: 65, paddingLeft: 4, paddingBottom: 10}}>
                        <Text numberOfLines={3}>{item.desc[locale]}</Text>
                        <Text style={{alignSelf: 'center', color:'#0000ff'}}>more...</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default withNavigation(RenderFeedItem);
