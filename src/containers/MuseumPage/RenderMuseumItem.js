import {ImageBackground, View, Text, TouchableOpacity, Dimensions} from 'react-native'
import styled from 'styled-components/native';
import React, {Component} from 'react';
import {withNavigation} from 'react-navigation';


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

class RenderMuseumItem extends Component{

    // Render the content into a list item
    render() {
        const item = this.props.item;
        const width = Dimensions.get('window').width;
        return (
            <View style={{flex: 1}}>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('MuseumPage', {data: item});}}>
                    <ImageBackground source={{uri: item.image}}
                                 style={{width: width, height: width}}>
                        <TextContainer>
                            <TittleText>{item.name["RU"]}</TittleText>
                        </TextContainer>
                        <TextContainer>
                            <DescriptionText>{item.desc["RU"]}</DescriptionText>
                        </TextContainer>
                        {/* <TextContainer>
                            <DescriptionText>{item.location}</DescriptionText>
                        </TextContainer>
                        <TextContainer>
                            <DescriptionText>{item.game}</DescriptionText>
                        </TextContainer> */}
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        );
    }
}

export default withNavigation(RenderMuseumItem);
