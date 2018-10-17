import {ImageBackground, View, Dimensions} from 'react-native'
import styled from 'styled-components/native';
import React, {Component} from 'react';


const TextContainer = styled.View`
    flex: 1
    alignItems: ${({ align }) => align || 'center'};
`;

const TittleText = styled.Text`
    color: 'rgb(255,255,255)'
    flex: 1
    fontSize: 20px
    fontWeight: bold
`;

const DescriptionText = styled.Text`
    color: 'rgb(255,255,255)'
    fontSize: 14px
    flex: 1
`;

class RenderFeedItem extends Component{

    // Render the content into a list item
    render() {
        const item = this.props.item;
        const width = Dimensions.get('window').width;
        return (
            <View style={{flex: 1}}>
                <ImageBackground source={{uri: item.image}}
                                 style={{width: width, height: width}}>
                    <TextContainer>
                        <TittleText>{item.title["EN"]}</TittleText>
                    </TextContainer>
                    <TextContainer>
                        <DescriptionText>{item.desc["EN"]}</DescriptionText>
                    </TextContainer>
                </ImageBackground>
            </View>
        );
    }
}

export default RenderFeedItem;
