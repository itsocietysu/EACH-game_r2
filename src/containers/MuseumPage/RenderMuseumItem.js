import {ImageBackground, View, Text, TouchableOpacity, Dimensions, Image} from 'react-native'
import styled from 'styled-components/native';
import React, {Component} from 'react';
import {withNavigation} from 'react-navigation';
import {TextContainer, TittleText, DescriptionText} from "../styles";
import {colors} from "../../utils/constants";

class RenderMuseumItem extends Component{

    // Render the content into a list item
    render() {
        const item = this.props.item;
        const width = Dimensions.get('window').width;
        const locale = this.props.locale.toUpperCase();
        const theme = this.props.theme;
        return (
            <View style={{flex: 1, backgroundColor: colors.BASE[theme]}} >
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('MuseumItem', {data: item});}}>
                    <View style={{flexDirection: 'row', backgroundColor: colors.BASE[theme], paddingLeft: 4, paddingBottom: 4, paddingTop: 2, paddingRight: 2}}>
                        <View style={{flex: 0.15, flexDirection: 'row'}}>
                            <Image source={{uri : item.image}}
                                   style={{width: 40, height: 40, borderRadius: 40/2, borderWidth: 1, borderColor: colors.SECOND[theme]}} />
                        </View>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <Text style={{fontSize: 15, fontWeight: 'bold', color: colors.TEXT[theme]}}>{item.name[locale]}</Text>
                        </View>
                    </View>
                    <View>

                        <ImageBackground source={{uri: item.image}}
                                         style={{width: width, height: width}}/>
                    </View>
                    <View style={{flex: 1, width: width, height: 65, paddingLeft: 4, paddingBottom: 10}}>
                        <Text numberOfLines={2} style={{color: colors.TEXT[theme]}}>{item.desc[locale]}</Text>
                        <Text style={{alignSelf: 'center', color:'#0000ff'}}>more...</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default withNavigation(RenderMuseumItem);
