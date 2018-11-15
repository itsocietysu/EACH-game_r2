import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';

import {TEXT_QUESTION, AR_PAINT_QUESTION, LOCATION_QUESTION} from "./constants";
import CustomList from "../../components/CustomList";



class LocationQuestion extends Component{

    render(){
        return(
            <View>
                <Text>Location Question</Text>
            </View>
        );
    }
}

export default LocationQuestion;
