import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native'

function ListItem(props) {
    return (
        <View>{props.item}</View>
    );
}

ListItem.propTypes = {
    item: PropTypes.any,
};

export default ListItem;