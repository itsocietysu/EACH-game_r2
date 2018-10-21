import React, {Component} from 'react';
import { ImageBackground, View, WebView, Dimensions} from 'react-native';
import { TextContainer, TittleText, DescriptionText, BasicText } from "../styles";

class MuseumItemScreen extends Component{
    render(){
        const {navigation} = this.props;
        const item = navigation.getParam('data', ''); // second parameter is some default value
        const width = Dimensions.get('window').width;
        return(
            <View style={{flex: 1}}>
                <ImageBackground source={{uri: item.image}}
                                 style={{width: width, height: width}}>
                    <TextContainer>
                        <TittleText>{item.name["EN"]}</TittleText>
                    </TextContainer>
                </ImageBackground>
            </View>
        );
    }
}
export default MuseumItemScreen;
