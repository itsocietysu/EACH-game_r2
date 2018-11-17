import {ImageBackground, View, Dimensions, TouchableOpacity} from 'react-native'
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
                    <ImageBackground source={{uri: item.image}}
                                     style={{width: width, height: width, paddingBottom: 10}}>
                        <TextContainer>
                            <TittleText color={'#ffffff'}>{item.title[locale]}</TittleText>
                        </TextContainer>
                        <TextContainer>
                            <DescriptionText color={'#ffffff'}>{item.desc[locale]}</DescriptionText>
                        </TextContainer>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        );
    }
}

export default withNavigation(RenderFeedItem);
