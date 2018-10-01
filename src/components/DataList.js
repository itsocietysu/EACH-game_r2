import React from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator} from 'react-native'
import List from './List/List';
import ListItem from './ListItem';


function DataList({ loading, error, data, component, scroll, array }) {
    if (loading) {
        return <List component={ActivityIndicator} scroll={scroll} />;
    }

    if (error !== false) {
        const ErrorComponent = () => <ListItem item="Something went wrong" />;
        console.error(error);
        return <List component={ErrorComponent} scroll={scroll} />;
    }

    if (data !== false) {
        return (
            <List items={data} array={array} component={component} scroll={scroll} />
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