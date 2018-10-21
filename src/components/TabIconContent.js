import React from 'react';
import {Ionicons, MaterialCommunityIcons, Foundation, FontAwesome } from '@expo/vector-icons';

const TabIconContent = ({ props }) => {
    const {routeName} = props.navigation.state;
    const focused = props.focused;
    const tintColor = props.tintColor;
    switch (routeName) {
        case 'Feeds':
            return <MaterialCommunityIcons name={'newspaper'} size={25} color={tintColor}/>;
        case 'Maps':
            return <Foundation name={'map'} size={25} color={tintColor}/>;
        case 'Museums':
            return <FontAwesome name={'empire'} size={25} color={tintColor}/>
        default:
            break;
    }
};

export default TabIconContent;
