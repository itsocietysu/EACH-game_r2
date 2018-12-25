import React from 'react';
import {View} from 'react-native';
import { MaterialCommunityIcons, Foundation, FontAwesome } from '@expo/vector-icons';

const TabIconContent = ({ navigation, tintColor }) => {
    const {routeName} = navigation.state;
    switch (routeName) {
        case 'Feeds':
            return <MaterialCommunityIcons name={'newspaper'} size={25} color={tintColor}/>;
        case 'Maps':
            return <Foundation name={'map'} size={25} color={tintColor}/>;
        case 'Museums':
            return <FontAwesome name={'empire'} size={25} color={tintColor}/>;
        case 'Profile':
            return <FontAwesome name={'user'} size={25} color={tintColor}/>;
        default:
            return <View/>;
    }
};

export default TabIconContent;
