import React from 'react';
import {View} from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

const TabIconContent = ({ navigation, tintColor }) => {
    const {routeName} = navigation.state;
    switch (routeName) {
        case 'Feeds':
            return <FontAwesome name={'send'} size={25} color={tintColor}/>;
        case 'Maps':
            return <AntDesign name={'enviroment'} size={25} color={tintColor}/>;
        case 'Museums':
            return <FontAwesome name={'university'} size={25} color={tintColor}/>;
        case 'Settings':
            return <AntDesign name={'setting'} size={25} color={tintColor}/>;
        default:
            return <View/>;
    }
};

export default TabIconContent;
