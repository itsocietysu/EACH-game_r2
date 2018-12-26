import React from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, View, Text, FlatList, ScrollView} from 'react-native';


function DataList({ loading, error, data, Component }) {
    if (loading) {
        return <View><ActivityIndicator/></View>;
    }

    if (error !== false) {
        return <Text>Something went wrong</Text>;
    }

    if (data) {
        return (
            <ScrollView>
                <FlatList
                    data={data}
                    renderItem={({item}) => <Component item={item}/>}
                    keyExtractor = {(item) => item.eid.toString()}
                    extraData = {data}
                />
            </ScrollView>
        );
    }
    return <View/>;
}

DataList.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.any,
    data: PropTypes.any,
    locale: PropTypes.string,
    Component: PropTypes.func.isRequired,
    scroll: PropTypes.bool,
    array: PropTypes.bool,
};

export default DataList;