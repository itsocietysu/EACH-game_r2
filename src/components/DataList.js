import React from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, View, Text} from 'react-native';
import ScrollList from './ScrollList';

function DataList({ loading, error, data, component, scroll, array }) {
    if (loading) {
        return <View><ActivityIndicator/></View>;
    }

    if (error !== false) {
        console.error(error);
        return <Text>Something went wrong</Text>;
    }

    if (data !== false) {
        return (
            <ScrollList component = {component} data = {data}/>
        );
    }

    return null;
}

DataList.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.any,
    data: PropTypes.any,
    component: PropTypes.func.isRequired,
    scroll: PropTypes.bool,
    array: PropTypes.bool,
};

export default DataList;