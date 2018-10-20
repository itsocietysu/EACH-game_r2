import React from "react";
import {Image, View, Text, Dimensions} from "react-native";

export default class LogoTitle extends React.Component {
    render() {
        const width = Dimensions.get('window').width;
        return (
            <View style={{flex:1}}>
                <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                    <Image
                        source={require('./../../assets/images/MuseeachLogo.jpg')}
                        style={{ width: 140, height: 40 }}
                    />
                </View>
                <View style={{height: 1, width: width, backgroundColor: '#ff0000'}}/>
            </View>
        );
    }
}